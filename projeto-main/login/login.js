const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    // res.send('Meu servidor backend já está online !')
    return res.json(base_usuarios)
})

let base_usuarios = [
    {
        email: "juan@hotmail.com",
        password: "123",
    },
    {
        email: "caetano@hotmail.com",
        password: "456"
    }
]


// app.post('/login', (req, res) => {
//     // console.log(req.body);
//     // console.log('Email: ' + base_usuarios.email);
//     // console.log('Password: ' + base_usuarios.password);
//     for(let x = 0; x < base_usuarios.length; x++) {
//         if (req.body.email == base_usuarios.email) { //Verificação de usuário
//             if(req.body.password == base_usuarios.password) { //Verificação da senha
//                 res.status(200).send('Seja bem vindo ' + req.body.email)
//             } else {
//                 res.status(401).send("Usuário ou senha incorreta")
//                 console.log('Usuário ou senha incorreta')
//             }
//         } else {
//             res.status(404).send("Usuário não existe")
//         }
//     }
// })

app.post('/login', (req, res) => {
    console.log(req.body)

    if (base_usuarios.find(usr => usr.email == req.body.email && usr.password == req.body.password)) {
        res.send(response)
        console.log(response)
    } else {
        res.send(JSON.stringify('ERROR'))
        // res.status(404).send("Usuário ou Senha inválidos")
    }
})

let porta = process.env.PORT || 3000;

app.listen(porta, (req, res) => {
    console.log('Server online, porta: ' + porta)
})