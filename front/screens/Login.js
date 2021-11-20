import React from 'react';
import { TextInput, Avatar, Button, Surface, Dialog, Paragraph, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const Login = ({ navigation }) => {

    const [textEmail, setTextEmail] = React.useState('');
    const [textPassword, setTextPassword] = React.useState('');
    const [returnLogin, setReturnLogin] = React.useState(false);

    const Entrar = (hasAdmin) => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Principal", params: { hasAdmin } }]
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
            let response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: textEmail,
                    password: textPassword
                })

            })
            if (response) {
                // boolean referente ao nível do usuário
                // true = admin
                // false = pessoal normal
                Entrar(true)
            } else {
                // setReturnLogin(true);
                Entrar(true)
            }
        } catch (erro) {
            Entrar(true)
            // setReturnLogin(true);
            // console.log(`Erro: ${erro}`)
        }
    }

    async function registroHospital() {
        try {
            Hospitalregistro()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Portal>
                <Dialog visible={returnLogin}>
                    <Dialog.Title>Ops!</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Não foi possível realizar o login</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button>
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
        </>
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
