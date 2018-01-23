module.exports.iniciaChat = function(application, req, res) {
  //body vem do middleware body-parser q recupera as propridades do form
  var dadosForm = req.body;

  //validacoes vem do middleware express-validator
  req.assert("apelido", "Nome ou apelido é obrigatório.").notEmpty();
  req
    .assert("apelido", "Nome ou Apelido deve ter entre 3 e 15 caracteres")
    .len(3, 15);

  var erros = req.validationErrors();
  if (erros) {
    res.render("index", { validacao: erros });
  }

  application.get("io").emit("msgParaCliente", {
    apelido: dadosForm.apelido,
    mensagem: " acabou de entrar no chat"
  });

  res.render("chat", { dadosForm: dadosForm });
};
