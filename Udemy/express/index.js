const express = require("express"); //Importando o Express
const app = express(); //Iniciando o Express


app.get("/", function(req, res) {
    res.send("Bem vindo ao guia do programador!");
    /*Uma response é enviada apenas uma vez, mas sempre é necessário
      uma resposta
    */
    
})

app.get("/blog/:artigo?", function(req,res) {
    let artigo = req.params.artigo;

    if(artigo){
        res.send(`Bem vindo ao artigo ${artigo}`);
    }else{
        res.send("Bem vindo ao meu blog!");
    }
})




app.get("/canal/youtube", function(req,res) {
    let canal = req.query["canal"];

    if(canal) {
        res.send(`Bem vindo ao canal ${canal}`);
    }else {
        res.send("<h1>Bem vindo ao youtube!</h1>")

    }
})

app.get("/ola/:nome", function(req,res){
    //REQ => DADOS ENVIADOS PELO USER
    //RES => RESPOSTA ENVIADA AO USUÁRIO
    res.send(`<h1>Olá! ${req.params.nome}<h1>`);
})
app.get("/ola/:nome/:empresa", function(req,res){
    //REQ => DADOS ENVIADOS PELO USER
    //RES => RESPOSTA ENVIADA AO USUÁRIO
    res.send(`<h1>Olá! ${req.params.nome}, da empresa ${req.params.empresa}<h1>`);
})
 
app.listen(8181,function(error){
    if(error) {
        console.log("Ocorreu um erro!", error);
    }else{
        console.log("Servidor iniciado com Sucesso");
    }
})

