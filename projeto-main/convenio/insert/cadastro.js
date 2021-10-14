const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let id_convenio = 0
let convenios = [
    {

    }
]

app.get('/convenio/consulta', (req, res) => {
    res.send(convenios)
})

app.post('/convenio/cadastro', (req, res) => {
    console.log(req.body)

    const convenio = {

    }

    convenios.push(convenio);
    res.status(201).send('Convênio adicionado com sucesso')

})

app.listen(3011, () => {
    console.log('Microsserviço Cadastro - Convênio rodando na porta 3011')
})