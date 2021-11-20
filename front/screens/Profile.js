import React from 'react';
import { TextInput, Avatar, Button, Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { PaperSelect } from 'react-native-paper-select';

const ProfileUser = ({ dataUser }) => {
    const [textDocumento, setTextDocumento] = React.useState(dataUser.document);
    const [textNascimento, setTextNascimento] = React.useState(dataUser.nascimento);
    const [textNome, setTextNome] = React.useState(dataUser.nome);
    const [textEmail, setTextEmail] = React.useState(dataUser.email);
    return (
        <Surface style={styles.surface}>
            <Avatar.Text style={styles.iconApp} size={24} label="" />
            <TextInput
                style={styles.input}
                label="Nome"
                mode="outlined"
                value={textNome}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="Data de nascimento"
                mode="outlined"
                value={textNascimento}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="CPF"
                mode="outlined"
                value={textDocumento}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                value={textEmail}
                disabled={true}
            />
        </Surface>
    )
}

const ProfileAdmin = ({ dataUser }) => {
    const [textNome, setTextNome] = React.useState(dataUser.nome);
    const [textCep, setTextCep] = React.useState(dataUser.cep);
    const [textLogradouro, setTextLogradouro] = React.useState(dataUser.logradouro);
    const [textBairro, setTextBairro] = React.useState(dataUser.bairro);
    const [textCidade, setTextCidade] = React.useState(dataUser.cidade);
    const [textUf, setTextUf] = React.useState(dataUser.uf);
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
        //   Exemplo de como deve ser o dataUser.convenio
        //   [{_id: '5', value: 'Porto Seguro'}
        //    {_id: '4', value: 'Bradesco Saúde'}
        //    {_id: '3', value: 'Sul America'}]
        selectedList: dataUser.convenio,
        error: '',
    });

    async function atualizar() {
        // Atualizar dados do Admin
        // try {
        //     let response = await fetch('http://localhost:3001/hospital/cadastro', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             nome_hospital: textNome,
        //             cep: textCep,
        //             logradouro: textLogradouro,
        //             bairro: textBairro,
        //             cidade: textCidade,
        //             uf: textUf
        //         })
        //     })
        //     if (response) Login()
        //     else navigation.reset({ index: 0, routes: [{ name: "Registro" }] })
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (
        <ScrollView>
        <Surface style={styles.surface}>
            <TextInput
                style={styles.input}
                label="Nome do Hospital"
                mode="outlined"
                value={textNome}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="CEP"
                mode="outlined"
                value={textCep}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="Logradouro"
                mode="outlined"
                value={textLogradouro}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="Bairro"
                mode="outlined"
                value={textBairro}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="Cidade"
                mode="outlined"
                value={textCidade}
                disabled={true}
            />

            <TextInput
                style={styles.input}
                label="UF"
                mode="outlined"
                value={textUf}
                disabled={true}
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
            <Button labelStyle={{ color: '#FFFFFF' }} style={styles.button} mode="contained" onPress={() => atualizar()}>
                Atualizar Hospital
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

export const Profile = ({navigation, hasAdmin, dataUser}) => {
    return (
        <>
            {
                hasAdmin ? <ProfileUser dataUser={dataUser} navigation={navigation} /> : <ProfileAdmin dataUser={dataUser} navigation={navigation} />
            }
        </>
    )
}
