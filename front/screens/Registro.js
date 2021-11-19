import React from 'react';
import { TextInput, Avatar, Button, Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const Registro = ({ navigation }) => {
    const [textDocumento, setTextDocumento] = React.useState('');
    const [textNascimento, setTextNascimento] = React.useState('');
    const [textNome, setTextNome] = React.useState('');
    const [textEmail, setTextEmail] = React.useState('');
    const [textPassword, setTextPassword] = React.useState('');

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
            let response = await fetch('http://localhost:3021/pacientes/cadastro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cpf: textDocumento,
                    data_nascimento: textNascimento,
                    nome_paciente: textNome,
                    email: textEmail,
                    senha: textPassword
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
                label="Nome"
                mode="outlined"
                value={textNome}
                onChangeText={textNome => setTextNome(textNome)}
            />

            <TextInput
                style={styles.input}
                label="Data de nascimento"
                mode="outlined"
                value={textNascimento}
                onChangeText={textNascimento => setTextNascimento(textNascimento)}
            />

            <TextInput
                style={styles.input}
                label="CPF"
                mode="outlined"
                value={textDocumento}
                onChangeText={textDocumento => setTextDocumento(textDocumento)}
            />

            <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                value={textEmail}
                onChangeText={textEmail => setTextEmail(textEmail)}
            />

            <TextInput
                style={styles.input}  
                label="Password"
                mode="outlined"
                value={textPassword}
                onChangeText={textPassword => setTextPassword(textPassword)}
                secureTextEntry={true}
            />

            <Button labelStyle={{ color: '#FFFFFF' }} style={styles.button} mode="contained" onPress={() => registrar()}>
                Criar Conta
            </Button>
            <Button style={styles.buttonOutlined} mode="outlined" onPress={() => Login()}>
                Voltar ao Login
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
