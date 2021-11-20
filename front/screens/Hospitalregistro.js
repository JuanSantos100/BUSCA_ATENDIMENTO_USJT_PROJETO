import React from 'react';
import { TextInput, Avatar, Button, Surface, Checkbox } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const Hospitalregistro = ({ navigation }) => {
    const [textNome, setTextNome] = React.useState('');
    const [textCep, setTextCep] = React.useState('');
    const [textLogradouro, setTextLogradouro] = React.useState('');
    const [textBairro, setTextBairro] = React.useState('');
    const [textCidade, setTextCidade] = React.useState('');
    const [textUf, setTextUf] = React.useState('');
    // const [checkedConvenio, setCheckedConvenio] = React.useState('');

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
        <Surface style={styles.surface}>
            <Avatar.Text style={styles.iconApp} size={24} label="" />
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
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                label="UF"
                mode="outlined"
                value={textUf}
                onChangeText={textUf => setTextUf(textUf)}
                secureTextEntry={true}
            />

            <Button labelStyle={{ color: '#FFFFFF' }} style={styles.button} mode="contained" onPress={() => registrar()}>
                Cadastrar Hospital
            </Button>
            <Button style={styles.buttonOutlined} mode="outlined" onPress={() => Login()}>
                Voltar
            </Button>
        </Surface>
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
