import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Alert} from "react-native";
import AppButton from "../components/AppButton";
import LogoEscura from "../components/Logo";
import {postUser} from "../services/API";

const Cadastro = (props) => {
    const [error, setError] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [senha, setSenha] = useState("");
    const [resp, setResp] = useState("");
    const [contatoResp, setContato] = useState("");

    const sanitizePhoneNumber = (number) => {
        number = number.replace(/[-()]/g, '');
        return number
      }

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        const celRegex = new RegExp('[0-9]{2}9[0-9]{8}')

        setError("");
        setNome(nome.trim());
        setEmail(email.trim());
        setCelular(sanitizePhoneNumber(celular.trim()));
        setSenha(senha.trim());
        setResp(resp.trim());
        setContato(sanitizePhoneNumber(contatoResp.trim()));

      try {
        if ( nome === "" || nome === null) {
            throw new Error("*Digite seu nome!");
    
          } else if (email === "" || email === null) {
            throw new Error("*Digite seu email !");
    
          } else if (!emailRegex.test(email)) {
            throw new Error ("*Email inválido!");
    
          } else if (celular === "" || celular === null || contatoResp === "" || contatoResp === null) {
            throw new Error("*Digite o número de celular!");
    
          } else if (celular.length > 11 || celular.length < 11 || contatoResp.length < 11 || contatoResp.length > 11) {
            throw new Error("Número de celular inválido!")

          } else if (!celRegex.test(celular)) {
            throw new Error ("*Número de  celular inválido!");
    
          } else if (senha === "" || senha === null) {
            throw new Error("*Digite a senha!");
    
          } else {

            const user = {
                email: email,
                nome: nome,
                celular: celular,
                nomeResp: resp,
                contatoResp: contatoResp,
                senha: senha
            }
            
            const response = await postUser(user);
            
            if (response) {
                Alert.alert("Usuário cadastrado com sucesso!");
            } else if (response === 403) {
                setError("Usuário já cadastrado!");
            }
      }

       
      } catch (error) {
        setError(error.message);
      }
    }

    return (
        <View style={style.body}>
            <LogoEscura/>

            <View style={style.container}>
                <Text style={style.title}>Criar conta</Text>
                {error ? <Text style={style.error}>{error}</Text> : null}
                <TextInput
                    placeholder="Nome"
                    style={style.input}
                    onChangeText={text => setNome(text)}></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Email"
                    style={style.input}
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Celular"
                    style={style.input}
                    keyboardType="phone-pad"
                    onChangeText={text => setCelular(text)}></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Senha"
                    style={style.input}
                    secureTextEntry={true}
                    onChangeText={text => setSenha(text)}></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Nome do responsável"
                    style={style.input}
                    onChangeText={text => setResp(text)}></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Contato do responsável"
                    style={style.input}
                    keyboardType="phone-pad"
                    onChangeText={text => setContato(text)}></TextInput>

                <View style={style.line}></View>
                <View style={style.button}>
                    <AppButton title='Cadastrar' onPress={handleSubmit}/>
                </View>

            </View>

            <View style={style.lineBottom}></View>
            <Text
                style={style.smallText}
                onPress={() => props.navigation.navigate('Login')}>Já possui uma conta? Toque para fazer login</Text>
            </View>
    )

}

const style = StyleSheet.create({

    body: {
        backgroundColor: "#fff",
        height: "100%"
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "60%",
        marginTop: 100
    },

    button: {
        marginTop: 25
    },

    title: {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 24,
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 10
    },

    line: {
        borderBottomColor: '#206199',
        borderBottomWidth: 1,
        width: 250
    },

    lineBottom: {
        borderBottomColor: '#717F7F',
        borderBottomWidth: 1,
        marginTop: 95

    },

    input: {
        width: 250
    },

    smallText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color: '#717F7F',
        fontSize: 18,
        left: 40,
        top: 15

    },

    error : {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color: 'red',
        right: 50,
        top: 15,
        marginBottom: 10
      }
})

export default Cadastro;
