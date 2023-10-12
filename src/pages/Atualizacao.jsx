import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Alert} from "react-native";
import AppButton from "../components/AppButton";
import { useSelector } from "react-redux";
import { updateUsers } from "../services/API";

const Atualizacao = () => {

    const currentUser = useSelector(state => state.currentUser);
    const token = useSelector(state => state.authReducer.token );
    const [error, setError] = useState("");
    const [nome, setNome] = useState(currentUser.user.nome);
    const [celular, setCelular] = useState(`${currentUser.user.telefone}`);
    const [resp, setResp] = useState(currentUser.user.nome_responsavel);
    const [contatoResp, setContato] = useState(`${currentUser.user.contato_responsavel}`);

    const handleUpdate = async (user) => {
        const response = await updateUsers(user, token);
        return response;
    }
   
    const handleSubmit = async () => {
        const celRegex = /^(\+55|00\s?55\s?)?(\(?\d{2}\)?\s?)?(9\d{4}[-.\s]?\d{4}|[2-9]\d{3}[-.\s]?\d{4})$/i

        setError("");
        setNome(nome.trim());
        setCelular(celular.trim());
        setResp(resp.trim());
        setContato(contatoResp.trim());

      try {
        if ( nome === "" || nome === null) {
            throw new Error("*Digite seu nome!");
    
          } else if (celular === "" || celular === null || contatoResp === "" || contatoResp === null) {
            throw new Error("*Digite o número de celular!");
    
          } else if (!celRegex.test(celular) || !celRegex.test(contatoResp)) {
            throw new Error ("*Número inválido!");
    
          } else {

            const user = {
                email: currentUser.user.email,
                nome: nome,
                celular: celular,
                nomeResp: resp,
                contatoResp: contatoResp
            }

            const response = handleUpdate(user);

            if (response) {
                Alert.alert("Atualização realizada com sucesso!");
            } else {
                Alert.alert("Erro ao atualizar");
            }
      }
  
      } catch (error) {
        setError(error.message)
      }
    }

    return (
        <View style={style.body}>
        

            <View style={style.container}>
                <Text style={style.title}>Atualizar dados</Text>
                {error ? <Text style={style.error}>{error}</Text> : null}

                <TextInput
                    placeholder="Nome"
                    style={style.input}
                    value={nome}
                    onChangeText={(text) => setNome(text)}>   
                </TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Celular"
                    style={style.input}
                    keyboardType="phone-pad"
                    value={celular}
                    onChangeText={(text) => setCelular(text)}
                    ></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Nome do responsável"
                    style={style.input}
                    value={resp}
                    onChangeText={(text) => setResp(text)}
                    ></TextInput>

                <View style={style.line}></View>
                <TextInput
                    placeholder="Contato do responsável"
                    style={style.input}
                    keyboardType="phone-pad"

                    value={contatoResp}
                    onChangeText={text => setContato(text)}></TextInput>

                <View style={style.line}></View>
                <View style={style.button}>
                    <AppButton title='Atualizar' onPress={handleSubmit}/>
                </View>

            </View>
            
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
        left: 50,
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

export default Atualizacao;