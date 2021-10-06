var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended : false}));

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
})

app.post("/logar", (req,res) => {
    let usuario = req.body.usuario;
    let senha = req.body.senha;
    let tipo = req.body.tipo;
    let usuarios = [["Caetano","ocaets","cliente"], 
    ["Juan","ojuju","master"], 
    ["Farfan", "ofarfas","hospital"]]
    
    for (let x=0; x < usuarios.length; x++) {
        if (usuarios[x][0] == usuario && usuarios[x][1] == senha)   {
            if (usuarios[x][2] == 'cliente') {
                console.log('cheguei aqui...')
                res.status(200).send("Seja bem vindo cliente")
            }
            else if (usuarios[x][2] == 'hospital') {
                res.status(200).send("Seja bem vindo hospital")
            }
            else if (usuarios[x][2] == 'master') {
                res.status(200).send("Seja bem vindo master")
            }
            else {
                res.status(401).send("Usuário não classificado")
            }          
        }                    
        
        else{
            res.end("Senha ou usuaário incorreto. Por favor tente novamente.")
        }
    }	
})

app.listen(3000, () => {
    console.log("Login, porta 3000")
});