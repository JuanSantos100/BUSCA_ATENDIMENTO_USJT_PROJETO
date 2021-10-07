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
    let tipo_usuario = req.body.tipo;
    // let usuarios = [["Caetano","ocaets","cliente"], 
    // ["Juan","ojuju","master"], 
    // ["Farfan", "ofarfas","hospital"]]

    let usuarios = [
        {"usuario": "Caetano", "senha": "ocaets", "tipo_usuario": "cliente"},
        {"usuario": "Juan", "senha": "ojuju", "tipo_usuario": "adm"}
    ]

    for (let u = 0; u < usuarios.length; u++) {
        console.log(us.usuario[usuario])
        console.log(us.senha[senha])
        
        us = usuarios[u]
        if(us.usuario === usuario && us.senha === senha) {
            console.log(u)
            console.log('Entrei no if')
            res.status(200)
            return;
        }
       
    }

    

    res.status(200).send("Login feito com sucesso")
    // for (let x=0; x < usuarios.length; x++) {
    //     if (usuarios[x][0] == usuario && usuarios[x][1] == senha)   {
                   
    //     }                    
        
    //     else{
    //         res.end("Senha ou usuaário incorreto. Por favor tente novamente.")
    //     }
    // }	

    
})

app.listen(3000, () => {console.log("Login, porta 3000")});