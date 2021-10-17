const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let id_hospital = 1
let hospitais = []

//         id: 1,
//         nome: 'Hopital Prevent',
//         tipo_hospital: 'privado', 
//         capacidade_atendimento : 30,
//         qtd_leitos_disponiveis : 200,
//         telefone: '2030-4000',
//         horario_funcionamento: '24h' 

//Teste
app.get ('/teste', (req, res) => {
    console.log ("Passando por aqui...")
    res.status(200).send('Está tudo ok ! ')
})

//Cadastro de hosptital
app.post('/hospital/cadastro', (req,res) => {
    console.log(req.body)
    
    const hospital = {
        id_hospital: id_hospital++,
        nome_hospital: req.body.nome_hospital,
        tipo_hospital: req.body.tipo_hospital,
        capacidade_atendimento : req.body.capacidade_atendimento,
        qtd_leitos_disponiveis : req.body.qtd_leitos_disponiveis,
        telefone: req.body.telefone,
        horario_funcionamento: req.body.horario_funcionamento
    }
    // id_hospital++;
    // const hospital = req.body
    hospitais.push(hospital)
    res.status(201).json(hospital)
})

//Deletar um hospital
app.delete('/hospital/delete/:id', (req, res) => {
    const hospital_id = +req.params.id
    console.log(hospital_id)

    const deleted = hospitais.find(hospital => hospital.id_hospital === hospital_id) //Encontrar o id do hospital
    // console.log(deleted)
    if (deleted) {
       hospitais = hospitais.filter(hospital => hospital.id_hospital !== hospital_id) 
       res.status(200).json(deleted)
    } else {
        
        res.status(404).json({mensagem: "Hospital não encontrado"})
    }
})

//Consulta de hospital
app.get('/hospital/consulta', (req, res) => {
    res.json(hospitais)
})

//Atualização de dados do hospital
app.put('/hospital/atualizacao/:id', (req, res) => {
    const hospital_id = +req.params.id
    console.log(hospital_id)
    const hospital_atualizado = hospitais.find(hospital => hospital.id_hospital === hospital_id)
    console.log(hospital_atualizado)


    if (hospital_atualizado) {
        hospital_atualizado.capacidade_atendimento = req.body.capacidade_atendimento
        hospital_atualizado.qtd_leitos_disponiveis = req.body.qtd_leitos_disponiveis
        res.status(200).json(hospital_atualizado)
    } else {
        res.status(404).json({mensagem: "Hospital não encontrado"})
    }
})



app.listen(3001, () => {
    console.log('Microserviço de hospitais - Hospital rodando na porta 3001')
})