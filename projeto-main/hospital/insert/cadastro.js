const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let id_hospital = 0
let hospitais = [
    {
        id: 1,
        nome: 'Hopital Prevent',
        tipo_hospital: 'privado', 
        capacidade_atendimento : 30,
        qtd_leitos_disponiveis : 200,
        telefone: '2030-4000',
        horario_funcionamento: '24h' 
    },

    {
        id: 2,
        nome: 'Hospital Público',
        tipo_hospital: 'público',
        capacidade_atendimento : 40,
        qtd_leitos_disponiveis : 100,
        telefone: '1520-6000',
        horario_funcionamento: '24h'   
    }
]

//Teste
app.get ('/teste', (req, res) => {
    console.log ("Passando por aqui...")
    res.status(200).send('Está tudo ok ! ')
})

//Cadastro de hosptital
app.post('/hospital/cadastro', (req,res) => {
    console.log(req.body)
    
    const hospital = {
        id: id_hospital++,
        nome: req.body.nome_hospital,
        tipo_hospital: req.body.tipo_hospital,
        capacidade_atendimento : req.body.capacidade_atendimento,
        qtd_leitos_disponiveis : req.body.qtd_leitos_disponíveis,
        telefone: req.body.telefone,
        horario_funcionamento: req.body.horario_funcionamento 
    }
    hospitais.push(hospital)
    res.status(201).json(hospitais)
})

//Consulta de hospital
app.get('/hospital/consulta', (req, res) => {
    res.json(hospitais)
})



app.listen(3001, () => {
    console.log('Microserviço Cadastro - Hospital rodando na porta 3001')
})