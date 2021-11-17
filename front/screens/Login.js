import React from 'react';
import { TextInput, Avatar, Button, Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const Login = ({ navigation }) => {

    const [textEmail, setTextEmail] = React.useState('');
    const [textPassword, setTextPassword] = React.useState('');

    const Entrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Principal" }]
        })
    }

    const Registro = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Registro" }]
        })
    }

    async function enviarLogin() {
        try {
            // let response = await fetch('http://192.168.1.66:3000/login', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: textEmail,
            //         password: textPassword
            //     })

            // })
            let response = await fetch('http://localhost:3000/')
            const data = await response.json()
            const check = data.some(el => el.email === textEmail && el.password === textPassword)
            if (check) Entrar()
            else navigation.reset({ index: 0, routes: [{ name: "Login" }] })
        } catch (erro) {
            console.log(`Erro: ${erro}`)
        }

        // let json = await response.json()
        // if (json === 'ERROR') {
        //     console.log('Erro de usuário')
        // }
    }

    return (
        <Surface style={styles.surface}>
            <Avatar.Text style={styles.iconApp} size={24} label="" />
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

            <Button labelStyle={{ color: '#FFFFFF' }} style={styles.button} mode="contained" onPress={() => enviarLogin()}>
                Entrar
            </Button>
            <Button style={styles.buttonOutlined} mode="outlined" onPress={() => Registro()}>
                Registro
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
