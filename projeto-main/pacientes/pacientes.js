const experss = require('express')
const bodyParser = require('body-parser')
const app = experss()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Servidor de usuários online')
})

let id_paciente = 1

let pacientes = []

app.post('/pacientes/cadastro', (req, res) => {
    const paciente = {
        id_paciente: id_paciente++,
        nome_paciente: req.body.nome_paciente,
        situacao: req.body.situacao,
        sexo: req.body.sexo,
        data_nascimento: req.body.data_nascimento
    }

    pacientes.push(paciente)
    res.status(201).json(paciente)
})


//Em desenvolvimento
app.post('/paciente/convenios/cadastro/:id', (req, res) => {
    const id_paciente = req.params.id
    const convenio = {
        id_convenio: req.body.id_convenio,
        nome_convenio: req.body.nome_convenio
    }

    const paciente_convenio = pacientes.find(paciente => paciente.id_paciente === id_paciente)
    console.log(paciente_convenio)
    if(paciente_convenio) {
        pacientes[id_paciente] = {convenio: convenio}
        res.status(201).send(pacientes[id_paciente])
    }
    else {
        res.status(404).json({mensagem: 'Paciente não encontrado'})
    }
})


app.delete('/pacientes/delete/:id', (req, res) => {
    const id_paciente = +req.params.id
    // console.log(id_paciente)

    const paciente_deletado = pacientes.find(paciente => paciente.id_paciente === id_paciente)
    console.log(paciente_deletado)
    if(paciente_deletado) {
        pacientes = pacientes.filter(paciente => paciente.id_paciente !== id_paciente)
        res.status(200).json(paciente_deletado)
    } else {
        res.status(404).json({mensagem: "Paciente não encontrado"})
    }
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


app.get('/pacientes/consulta', (req, res) => {
    res.json(pacientes)
})

app.listen(3021, () => {
    console.log('Microserviço de pacientes rodando porta 3021')
})