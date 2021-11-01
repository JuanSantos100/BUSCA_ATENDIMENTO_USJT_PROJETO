const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const eventos = []

app.post('/eventos', (req, res) => {
    const evento = req.body
    eventos.push(evento)
    console.log(evento)

    //enviando o evento para o microsserviço de cadastro de pacientes
    axios.post('http://localhost:3021/eventos', evento)
    res.status(204).end()
})

app.get('/eventos', (req, res) => {
    res.send(eventos)
})

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000."))