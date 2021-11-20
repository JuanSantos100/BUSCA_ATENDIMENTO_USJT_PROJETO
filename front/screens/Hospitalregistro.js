import React from 'react';
import { TextInput, Button, Surface } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { StyleSheet, ScrollView } from 'react-native';

export const Hospitalregistro = ({ navigation }) => {
    const [textNome, setTextNome] = React.useState('');
    const [textCep, setTextCep] = React.useState('');
    const [textLogradouro, setTextLogradouro] = React.useState('');
    const [textNumero, setTextNumero] = React.useState('');
    const [textBairro, setTextBairro] = React.useState('');
    const [textCidade, setTextCidade] = React.useState('');
    const [textUf, setTextUf] = React.useState('');
    const [convenio, setConvenio] = React.useState({
        value: '',
        list: [
            { _id: '1', value: 'Santander' },
            { _id: '2', value: 'Amil' },
            { _id: '3', value: 'Sul America' },
            { _id: '4', value: 'Bradesco Saúde' },
            { _id: '5', value: 'Porto Seguro' },
            { _id: '6', value: 'Unimed' }
        ],
        selectedList: [],
        error: '',
    });
    const Entrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Principal" }]
        })
    }

    const Login = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }

    fetch(`https://viacep.com.br/ws/${textCep}/json/`, { method: 'GET', mode: 'cors', cache: 'default' })
        .then(response => {
            response.json()
                .then(data => showData(data))
        })
        .catch(e => console.log(e))

    const showData = async (result) => {
        for (const campo in result) {
            switch (campo) {
                case "logradouro":
                    setTextLogradouro(result[campo])
                    break;
                case "bairro":
                    setTextBairro(result[campo])
                    break;
                case "localidade":
                    setTextCidade(result[campo])
                    break;
                case "uf":
                    setTextUf(result[campo])
                    break;
            }
        }
    }

    async function registrar() {
        try {
            let response = await fetch('http://localhost:3001/hospital/cadastro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_hospital: textNome,
                    cep: textCep,
                    logradouro: textLogradouro,
                    numero: textNumero,
                    bairro: textBairro,
                    cidade: textCidade,
                    uf: textUf
                })
            })
            if (response) Login()
            else navigation.reset({ index: 0, routes: [{ name: "Registro" }] })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView>
            <Surface style={styles.surface}>
                <TextInput
                    style={styles.input}
                    label="Nome do Hospital"
                    mode="outlined"
                    value={textNome}
                    onChangeText={textNome => setTextNome(textNome)}
                />

                <TextInput
                    style={styles.input}
                    label="CEP"
                    mode="outlined"
                    value={textCep}
                    onChangeText={textCep => setTextCep(textCep)}
                />

                <TextInput
                    style={styles.input}
                    label="Logradouro"
                    mode="outlined"
                    value={textLogradouro}
                    onChangeText={textLogradouro => setTextLogradouro(textLogradouro)}
                />

                <TextInput
                    style={styles.input}
                    label="Numero"
                    mode="outlined"
                    value={textNumero}
                    onChangeText={textNumero => setTextNumero(textNumero)}
                />

                <TextInput
                    style={styles.input}
                    label="Bairro"
                    mode="outlined"
                    value={textBairro}
                    onChangeText={textBairro => setTextBairro(textBairro)}
                />

                <TextInput
                    style={styles.input}
                    label="Cidade"
                    mode="outlined"
                    value={textCidade}
                    onChangeText={textCidade => setTextCidade(textCidade)}
                />

                <TextInput
                    style={styles.input}
                    label="UF"
                    mode="outlined"
                    value={textUf}
                    onChangeText={textUf => setTextUf(textUf)}
                />

                <PaperSelect
                    label="Conveio"
                    value={convenio.value}
                    onSelection={(value) => {
                        setConvenio({
                            ...convenio,
                            value: value.text,
                            selectedList: value.selectedList,
                            error: '',
                        });
                    }}
                    arrayList={[...convenio.list]}
                    selectedArrayList={convenio.selectedList}
                    error={!!convenio.error}
                    errorText={convenio.error}
                    multiEnable={true}
                />
                <Button labelStyle={{ color: '#FFFFFF' }} style={styles.button} mode="contained" onPress={() => registrar()}>
                    Cadastrar Hospital
                </Button>
            </Surface>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    surface: {
        justifyContent: 'center',
        elevation: 4,
        flex: 1,
        padding: 20
    },
    iconApp: {
        height: 120,
        width: 120,
        marginBottom: 20,
        alignSelf: 'center'
    },
    input: {
        backgroundColor: '#ffffff',
        marginBottom: 10
    },
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonOutlined: {
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        borderColor: '#FF6347'
    }
});
