//Importar as configuracoes do servidor
var app = require("./config/server");

//parametrizar porta de escuta
var server = app.listen(3000, function() {
  console.log("Servidor Online");
});

var io = require("socket.io").listen(server);

app.set("io", io);

//criar a conexao por websocket
io.on("connection", function(socket) {
  console.log("Usuario conectou...");

  socket.on("disconnect", function() {
    console.log("Usuario desconectou...");
  });

  socket.on("msgParaServidor", function(data) {
    /*dialogo */
    socket.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    socket.broadcast.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    /**participantes */
    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit("participanteParaCliente", {
        apelido: data.apelido
      });

      socket.broadcast.emit("participantesParaCliente", {
        apelido: data.apelido
      });
    }
  });
});
