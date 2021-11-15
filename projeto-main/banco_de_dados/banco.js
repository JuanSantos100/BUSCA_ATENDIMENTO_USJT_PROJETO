const express = require('express')
const mysql = require('mysql2')
const app = express()

//registrando middleware
app.use(express.json())

const porta = process.env.PORT || 4000

app.listen(porta, () => console.log(`Em execução. Porta: ${porta}`))