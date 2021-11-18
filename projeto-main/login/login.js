const express = require('express');
require('dotenv').config()
const mysql =  require('mysql2')
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const { emit } = require('nodemon');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'master',
//     database: 'busca_atendimento'
// })

// db.connect((error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("MYSQL Connected ! ")
//     }
// })

//Criando pool de conexões
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
})

app.get('/', (req, res) => {
    // res.send('Meu servidor backend já está online !')
    return res.json(base_usuarios)
})



// let base_usuarios = [
//     {
//         email: "juan@hotmail.com",
//         password: "123",
//     },
//     {
//         email: "caetano@hotmail.com",
//         password: "456"
//     }
// ]

app.post('/login', (req, res) => {
    
    const email = req.body.email
    // console.log(email)
    const password = req.body.password
    const sql = 
    `
        SELECT EMAIL, SENHA FROM PACIENTE WHERE EMAIL = ?
    `
    pool.query(
        sql,
        [email],
        (errors, results, fields) => {
            if(errors) {
                console.log(errors)
            }

            console.log(results)

            /*
            Pegando valores do results

            // console.log(results[0]['EMAIL'])
            // console.log(results[0]['SENHA'])
            */

            //Necessário verificar quando os dados do paciente não baterem com o banco -> Gera erros 

            if (results !== []) {
                if(results[0]['EMAIL'] == email && results[0]['SENHA'] == password) {                    
                    console.log('Usuário Logado!')
                    return res.json(results)
                } else {
                    console.log('Tentativa de login falhou ! Usuário ou senha inválidos')
                    return res.send(JSON.stringify('Tentativa de login falhou ! Usuário ou senha inválidos'))
                } 

            } else {
                return res.send('Usuário não encontrado !')
            }
        
        }
    )
})


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

// app.post('/login', (req, res) => {
//     console.log(req.body)

//     if (base_usuarios.find(usr => usr.email == req.body.email && usr.password == req.body.password)) {
//         res.send(response)
//         console.log(response)
//     } else {
//         res.send(JSON.stringify('ERROR'))
//         // res.status(404).send("Usuário ou Senha inválidos")
//     }
// })

let porta = process.env.PORT || 3000;

app.listen(porta, (req, res) => {
    console.log('Server online, porta: ' + porta)
})