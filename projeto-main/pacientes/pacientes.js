require('dotenv').config()
const experss = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const { restart } = require('nodemon')
const app = experss()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env


app.get('/', (req, res) => {
    res.send('Servidor de usuários online')
})

//CADASTRO DE PACIENTE
app.post('/paciente/cadastro', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })

    const cpf = req.body.cpf
    const nome = req.body.nome_paciente
    const sql = `INSERT INTO PACIENTE (CPF_PACIENTE, NM_PACIENTE) VALUES (?,?)`
    connection.query(
        sql,
        [cpf, nome], 
        (err, results, fields) => {            
            console.log(results)
            res.send('Paciente cadastrado com sucesso')
        }
    )
})

//CONSULTA DE ACORDO UM PACIENTE
app.get('/paciente/consulta/:id', (req, res) => {
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
app.get('/paciente/consulta', (req, res) => {
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


//Em desenvolvimento
// app.post('/paciente/convenios/cadastro/:id', (req, res) => {
//     const id_paciente = req.params.id
//     const convenio = {
//         id_convenio: req.body.id_convenio,
//         nome_convenio: req.body.nome_convenio
//     }

//     const paciente_convenio = pacientes.find(paciente => paciente.id_paciente === id_paciente)
//     console.log(paciente_convenio)
//     if(paciente_convenio) {
//         pacientes[id_paciente] = {convenio: convenio}
//         res.status(201).send(pacientes[id_paciente])
//     }
//     else {
//         res.status(404).json({mensagem: 'Paciente não encontrado'})
//     }
// })

// CADASTRO DE CONVENIO PARA PACIENTE
app.post ('/paciente/convenios/cadastro/:id', (req, res) => {
    const connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })
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

app.put('/pacientes/atualizacao/:id', (req, res) => {
    const id_paciente = +req.params.id
    const paciente_atualizado = pacientes.find(paciente => paciente.id_paciente === id_paciente)
    if (paciente_atualizado) {
        paciente_atualizado.nome_paciente = req.body.nome_paciente
        paciente_atualizado.situacao = req.body.situacao
        paciente_atualizado.sexo = req.body.sexo
        res.status(200).json(paciente_atualizado)
    } else {
        res.status(404).json({mensagem: "Paciente não encontrado"})
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