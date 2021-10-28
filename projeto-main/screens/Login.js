import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended : false}));

// let base_usuarios = [
//     ["juan@hotmail.com", "123", 1], 
//     ["caetano@hotmail.com", "456", 2],
//     ["farfan@hotmail.com", "789", 3]
// ]




export default function Login({ navigation }) {
    

    const [display, setDisplay] = useState('none')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const entrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Principal" }]
        })
    }

   
    async function enviarLogin() {
        let response = await fetch('http://192.168.1.66:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })

        })
        let json = await response.json()
        console.log(json)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <Text h3>Busca Atendimento</Text>

                <Text>{email} - {password}</Text>
                <Input
                    placeholder="E-mail"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={value => setEmail(value)}
                    keyboardType="email-address"
                />
                <Input
                    placeholder="Sua senha"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />
                <Button
                    icon={
                        <Icon
                            name="check"
                            size={15}
                            color="white"
                        />
                    }
                    title=" Entrar"
                    //onPress={() => entrar()}
                    onPress={() => enviarLogin()}
                />
            </View>

            {/* /* <View>
                <Text style={styles.login_error_msg(display)}>Usuário ou senha inválidos</Text>
            </View> */}
        </KeyboardAvoidingView>
    );
}
