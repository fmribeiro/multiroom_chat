//importar o modulo do framework express
var express = require("express");

//importar o modulo do framework consign
var consign = require("consign");

//importar o modulo do framework body-parser
var bodyParser = require("body-parser");

//importar o modulo do framework express-validator
var expressValidator = require("express-validator");

//iniciar o objeto do express
var app = express();

//setar as variaveis view engine e view do express
app.set("view engine", "ejs");
app.set("views", "./app/views");

//configurar os middleware express-static
app.use(express.static("./app/public"));

//configurar os middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//configurar os middleware express-validator
app.use(expressValidator());

//efetua o auto-load das rotas, dos models e dos controllers para o objeto app
consign()
  .include("app/routes")
  .then("app/models")
  .then("app/controllers")
  .into(app);

//exportar o objeto app
module.exports = app;
