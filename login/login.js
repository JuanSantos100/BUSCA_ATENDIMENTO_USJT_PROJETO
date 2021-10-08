var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended : false}));

app.get("/",function(req,res){
	res.sendFile(__dirname + "/login.html");
})

app.post("/logar", (req,res) => {
    let usuario = req.body.usuario;
    let senha = req.body.senha;
    // let tipo_usuario = req.body.tipo_usuario;
    console.log("Usuário: " + usuario + ' Senha: ' + senha)
    
    let base_usuarios = [["Juan", "123", 1], ["Caetano", "456", 2], ["Farfan", "789", 3]]
    // Funcionando

    for(let x = 0; x < base_usuarios.length; x++) {
        if (usuario == base_usuarios[x][0]) { //Verificação de usuário
            if(senha == base_usuarios[x][1]) { //Verificação da senha
                if (base_usuarios[x][2] == 1) { //Diferenciação de login
                    res.status(200).send("Seja bem vindo " + usuario + "!! Você é admin master! ") 
                } else if (base_usuarios[x][2] == 2) {
                    res.status(200).send("Seja bem vindo " + usuario + "!! Você é Hospital! ")
                } else if (base_usuarios[x][2] == 3) {
                    res.status(200).send("Seja bem vindo " + usuario + "!! Você é paciente! ")
                }      
            } else {
                res.status(401).send("Usuário ou senha incorreta")
            }
        } 
    }
    res.status(404).send("Usuário não existe")

    

})
   
app.listen(3000, () => {console.log("Serviço de login. porta 3000")})
    


