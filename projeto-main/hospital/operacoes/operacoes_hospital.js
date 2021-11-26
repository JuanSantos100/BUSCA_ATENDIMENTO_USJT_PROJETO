require('dotenv').config()
const mysql = require('mysql2')
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
})


//Cadastro de hosptital
app.post('/hospital/cadastro', (req, res) => {
    const nome_hospital = req.body.nome_hospital
    const cep = req.body.cep
    const endereco_hospital = req.body.endereco_hospital

    console.log(nome_hospital, cep, endereco_hospital)

    const sql = `
        INSERT INTO HOSPITAL (NM_HOSPITAL, CEP, ENDERECO_HOSPITAL) VALUES (?, ?, ?)
    `
    pool.query(
        sql,
        [nome_hospital, cep, endereco_hospital],
        (err, resuls, fields) => {
            console.log(resuls)
            res.status(200)
        }
    )
})

//DELETE DE HOSPITAIS
app.delete('/hospital/delete/:id', (req, res) => {
    const cd_hospital = +req.params.id

    // const sql_consulta = `
    //     SELECT * FROM HOSPITAL WHERE CD_HOSPITAL = ?
    // `
    const sql = `
        DELETE FROM HOSPITAL
        WHERE CD_HOSPITAL = ?
    
    `

    pool.query(
        sql,
        [cd_hospital],
        (err, results, fields) => {
            console.log(results)
            res.send('Operação realizada com sucesso !')
        }
    )
})

//CONSULTA DE 1 HOSPITAL
app.get('/hospital/consulta/:id', (req, res) => {
    const cd_hospital = +req.params.id
    const sql = `SELECT * FROM HOSPITAL WHERE CD_HOSPITAL = ?`

    pool.query(
        sql,
        [cd_hospital],
        (err, results, fields) => {
            console.log(results)
            res.json(results)
        }

    )
})

//CONSULTA DE TODOS OS HOSPITAIS
app.get('/hospital/consulta', (req, res) => {
    const sql = `SELECT * FROM HOSPITAL`

    pool.query(
        sql,
        (err, results, fields) => {
            console.log(results)
            res.json(results)
        }

    )
})

//Atualização de dados do hospital
app.put('/hospital/atualizacao/:id', (req, res) => {
    const cd_hospital = req.params.id
    const qtd_leitos = req.body.qtd_leitos
    const capacidade_atendimento = req.body.capacidade_atendimento

    const sql = `
        UPDATE HOSPITAL
        SET QTD_LEITOS = ?,
        CPD_ATENDIMENTO = ?
        WHERE CD_HOSPITAL = ?
    
    `

    pool.query(
        sql,
        [qtd_leitos, capacidade_atendimento, cd_hospital],
        (err, results, fields) => {
            console.log(results)
            res.status(200)      
        }

    )
})


app.listen(3012, () => {
    console.log('Microserviço de hospitais - Hospital rodando na porta 3012')
})