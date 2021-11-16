require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env

//pool de conexões

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
})


//CADASTRO DE CONVÊNIO
app.post('/convenio/cadastro', (req, res) => {
    const registro_ans = req.body.registro_ans
    const nome_convenio = req.body.nome_convenio
    
    const sql = `
        INSERT INTO CONVENIO (REGISTRO_ANS, NM_CONVENIO) VALUES (?, ?)
    `

    pool.query(
        sql,
        [registro_ans, nome_convenio],
        (err, results, fields) => {
            console.log(results)
            res.send('Operação realizada com sucesso !')
        }

    )
})

//EXCLUSÃO DE UM CONVÊNIO BASEADO NO ID
app.delete('/convenio/delete/:id', (req, res) => {
    const cd_convenio = +req.params.id

    const sql = `
        DELETE FROM CONVENIO 
        WHERE CD_CONVENIO = ?
    `

    pool.query(
        sql,
        [cd_convenio],
        (err, results, fields) => {
            console.log(results)
            res.send('Operação realizada com sucesso !')
        }

    )
})

//Consulta de convenio
app.get('/convenio/consulta', (req, res) => {
    res.json(convenios)
})

//Atualização de dados do convenio
app.put('/convenio/atualizacao/:id', (req, res) => {
    const convenio_id = +req.params.id
    console.log(convenio_id)
    const convenio_atualizado = convenios.find(convenio => convenio.id_convenio === convenio_id)
    console.log(convenio_atualizado)


    if (convenio_atualizado) {
        convenio_atualizado.nome_convenio = req.body.nome_convenio
        convenio_atualizado.tipo_convenio = req.body.tipo_convenio
        res.status(200).json(convenio_atualizado)
    } else {
        res.status(404).json({mensagem: "convenio não encontrado"})
    }
})



app.listen(3011, () => {
    console.log('Microserviço de convenios - convenio rodando na porta 3011')
})