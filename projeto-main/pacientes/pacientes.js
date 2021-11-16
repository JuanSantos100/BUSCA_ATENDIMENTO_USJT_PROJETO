require('dotenv').config()
const experss = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const { restart } = require('nodemon')
const app = experss()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
})


app.get('/', (req, res) => {
    res.send('Servidor de usuários online')
})

//CADASTRO DE PACIENTE
app.post('/pacientes/cadastro', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const cpf = req.body.cpf
    const nome = req.body.nome_paciente
    const email = req.body.email
    const senha = req.body.senha
    const sql = `INSERT INTO PACIENTE (CPF_PACIENTE, NM_PACIENTE, EMAIL, SENHA) VALUES (?,?,?,?)`
    connection.query(
        sql,
        [cpf, nome, email, senha], 
        (err, results, fields) => {            
            console.log(results)
            res.send('Paciente cadastrado com sucesso')
        }
    )
})

//CONSULTA DE ACORDO UM PACIENTE
app.get('/pacientes/consulta/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const id_paciente = +req.params.id 

    const sql = 'SELECT * FROM PACIENTE WHERE CD_PACIENTE = ?'

    connection.query(
        sql,
        [id_paciente], 
        (err, results, fields) => {
            res.json(results)
        }
    )
})

//CONSULTA TODOS OS PACIENTES
app.get('/pacientes/consulta', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const id_paciente = +req.params.id 

    const sql = 'SELECT * FROM PACIENTE'

    connection.query(
        sql,
        [id_paciente], 
        (err, results, fields) => {
            res.json(results)
        }
    )
})

// CADASTRO DE CONVENIO PARA PACIENTE
app.post ('/pacientes/convenios/cadastro/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const sql = `
        INSERT INTO PACIENTE_CONVENIO (CD_CONVENIO, CD_PACIENTE) VALUES (?,?)
    `
    const sql2 = `
        UPDATE PACIENTE SET CARTEIRINHA = ? WHERE CD_PACIENTE = ?
    `
    const cd_paciente = +req.params.id
    const cd_convenio = +req.body.cd_convenio
    const carteirinha = req.body.carteirinha

    connection.query(
        sql, 
        [cd_convenio, cd_paciente], 
        (err, results, fields) => {
            console.log(results)
        }
    )

    connection.query(
        sql2,
        [carteirinha, cd_paciente],
        (err, results, fields) => {
            console.log(results)
            res.send('Carteirinha adicionada com sucesso')
        }
    )
        
})


//DELETE DE UM PACIENTE
app.delete ('/pacientes/delete/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const id_paciente = req.params.id

    const sql = `DELETE FROM PACIENTE WHERE CD_PACIENTE = ?`
    connection.query(
        sql,
        [id_paciente],
        (err, results, fields) => {
            res.send('Paciente excluído')
        }
    )
})


//ATUALIZANDO DADOS DE PACIENTE
app.put('/pacientes/atualizacao/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const id_paciente = req.params.id
    const novo_nome = req.body.nome_paciente
    const nova_senha = req.body.senha

    const sql = `UPDATE PACIENTE 
        SET NM_PACIENTE = ?
        WHERE CD_PACIENTE = ?
    `

    const sql2 = `
        UPDATE PACIENTE 
        SET SENHA = ?
        WHERE CD_PACIENTE = ?
    `

    if (nova_senha == undefined) {
        connection.query(
            sql,
            [novo_nome, id_paciente],
            (err, results, fields) => {
                console.log(results)
                res.send('Paciente atualizado com sucesso')
            }
        )
    }
    else if (nova_senha != undefined) {
        connection.query(
            sql2,
            [nova_senha, id_paciente],
            (err, results, fields) => {
                console.log(results)
                res.send('Senha alterada com sucesso')
            }
        )
    }
})



app.get('/hospitais', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const sql = 'SELECT * FROM HOSPITAL'
    connection.query(
        sql, 
        (err, results, fields) => {
            console.log(results)
            console.log(fields)
            res.send('ok')
        }
    )
})


app.get('/pacientes/consulta', (req, res) => {
    res.json(pacientes)
})

app.listen(3021, () => {
    console.log('Microserviço de pacientes rodando porta 3021')
})