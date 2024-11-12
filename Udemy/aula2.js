let http = require("http");


//O básico do NodeJS

http.createServer(function(request, response) {
    response.end("<h1>Bem vindo ao meu site!<h1>");
}).listen(8181);
console.log("Meu servidor está rodando")

