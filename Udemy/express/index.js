const express = require("express"); //Importando o Express
const app = express(); //Iniciando o Express


app.get("/", function(req, res) {
    res.send("Bem vindo ao guia do programador!");
    /*Uma response é enviada apenas uma vez, mas sempre é necessário
      uma resposta
    */
    
})

app.get("/blog", function(req,res) {
    res.send("Bem vindo ao meu blog!");
})


app.get("/canal/youtube", function(req,res) {
    res.send("<h1>Bem vindo ao meu canal!</h1>")
})

app.listen(8181,function(error){
    if(error) {
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com Sucesso");
    }
})

