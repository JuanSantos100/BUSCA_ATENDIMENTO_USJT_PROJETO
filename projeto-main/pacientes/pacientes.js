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
    const cpf = req.body.cpf
    const nome = req.body.nome_paciente
    const email = req.body.email
    const senha = req.body.senha
    const sql = `INSERT INTO PACIENTE (CPF_PACIENTE, NM_PACIENTE, EMAIL, SENHA) VALUES (?,?,?,?)`
    pool.query(
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
    const id_paciente = +req.params.id 

    const sql = 'SELECT * FROM PACIENTE WHERE CD_PACIENTE = ?'

    pool.query(
        sql,
        [id_paciente], 
        (err, results, fields) => {
            res.json(results)
        }
    )
})

//CONSULTA TODOS OS PACIENTES
app.get('/pacientes/consulta', (req, res) => {   
    const id_paciente = +req.params.id 

    const sql = 'SELECT * FROM PACIENTE'

    pool.query(
        sql,
        [id_paciente], 
        (err, results, fields) => {
            res.json(results)
        }
    )
})

// CADASTRO DE CONVENIO PARA PACIENTE
app.post ('/pacientes/convenios/cadastro/:id', (req, res) => {

    // const sql = `
    //     INSERT INTO PACIENTE_CONVENIO (CD_CONVENIO, CD_PACIENTE) VALUES (?,?)
    // `
    // const sql2 = `
    //     UPDATE PACIENTE SET CARTEIRINHA = ? WHERE CD_PACIENTE = ?
    // `
    const sql = `
        INSERT INTO PACIENTE_CONVENIO (CD_CONVENIO, CD_PACIENTE, CARTEIRINHA) VALUES(?, ?, ?)
    
    `

    const cd_paciente = +req.params.id
    const cd_convenio = +req.body.cd_convenio
    const carteirinha = req.body.carteirinha

    console.log(cd_convenio, cd_paciente, carteirinha)

    pool.query(
        sql, 
        [cd_convenio, cd_paciente, carteirinha], 
        (err, results, fields) => {
            console.log(results)
            res.send('Operação realizada com sucesso !')
        }
    )
        
})

//EXCLUSÃO DE CARTEIRINHA PARA O PACIENTE
app.delete('/pacientes/convenios/delete/:id', (req, res) => {
    const cd_paciente = +req.params.id
    const cd_convenio = +req.body.cd_convenio
    
    const sql = `
        DELETE FROM PACIENTE_CONVENIO
        WHERE CD_CONVENIO = ?
        AND CD_PACIENTE = ?
    `

    //Necessário configurar caso não encontre o registro

    pool.query(

        sql,
        [cd_convenio, cd_paciente],
        (err, results, fields) => {
            console.log(results)
            res.send('Operação realizada com sucesso !')
        }
    )
})


//DELETE DE UM PACIENTE
app.delete ('/pacientes/delete/:id', (req, res) => {
    const id_paciente = req.params.id

    const sql = `DELETE FROM PACIENTE WHERE CD_PACIENTE = ?`
    pool.query(
        sql,
        [id_paciente],
        (err, results, fields) => {
            res.send('Paciente excluído')
        }
    )
})


//ATUALIZANDO DADOS DE PACIENTE
app.put('/pacientes/atualizacao/:id', (req, res) => {

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
        pool.query(
            sql,
            [novo_nome, id_paciente],
            (err, results, fields) => {
                console.log(results)
                res.send('Paciente atualizado com sucesso')
            }
        )
    }
    else if (nova_senha != undefined) {
        pool.query(
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
    const sql = 'SELECT * FROM HOSPITAL'
    pool.query(
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