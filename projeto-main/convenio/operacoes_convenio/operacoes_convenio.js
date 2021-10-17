const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let id_convenio = 1
let convenios = []

//Cadastro de hosptital
app.post('/convenio/cadastro', (req,res) => {
    console.log(req.body)
    
    const convenio = {
        id_convenio: id_convenio++,
        nome_convenio: req.body.nome_convenio,
        tipo_convenio: req.body.tipo_convenio,
        registro_ans: req.body.registro_ans,
    }
    convenios.push(convenio)
    res.status(201).json(convenio)
})

//Deletar um convenio
app.delete('/convenio/delete/:id', (req, res) => {
    const convenio_id = +req.params.id
    console.log(convenio_id)

    const deleted = convenios.find(convenio => convenio.id_convenio === convenio_id) //Encontrar o id do convenio
    // console.log(deleted)
    if (deleted) {
       convenios = convenios.filter(convenio => convenio.id_convenio !== convenio_id) 
       res.status(200).json(deleted)
    } else {
        
        res.status(404).json({mensagem: "convenio não encontrado"})
    }
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