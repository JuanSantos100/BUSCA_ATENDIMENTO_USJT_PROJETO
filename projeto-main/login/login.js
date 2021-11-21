const express = require('express');
require('dotenv').config()
const mysql = require('mysql2')
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

//Serviço de login !
app.post('/login', (req, res) => {

    const email = req.body.email

    const password = req.body.password

    // console.log(email, password)

    const sql =
        `
        SELECT EMAIL, SENHA, SN_ADMIN FROM PACIENTE WHERE EMAIL = ?
    `
    pool.query(
        sql,
        [email],
        (errors, results, fields) => {
            if (errors) {
                console.log(errors)
            }

            console.log('passou')

            console.log(results)


            //Necessário verificar quando os dados do paciente não baterem com o banco -> Gera erros 
            try {
                if (results[0]?.EMAIL == email && results[0]?.SENHA == password) {
                    console.log('Usuário Logado!')
                    return res.json(results)
                } else {
                    console.log('Tentativa de login falhou ! Usuário ou senha inválidos')
                    return res.status(403).end()
                }

            } catch (error) {
                console.log(error)
            }

        }
    )
})

let porta = process.env.PORT || 3000;

app.listen(porta, (req, res) => {
    console.log('Server online, porta: ' + porta)
})