import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput} from "react-native";
import AppButton from "../components/AppButton";
import { useSelector } from 'react-redux';
import { postMedicine } from "../services/API";

const Adicionar = () => {
    const email = useSelector(state => state.currentUser);
    const token = useSelector(state => state.authReducer);

    const [nome, setNome] = useState("");
    const [error, setError] = useState("");
    const [doses, setDoses] = useState("");
    const [posologia, setPosologia] = useState("");
    const [periodo, setPeriodo] = useState("");
    
    const handleSubmit = async () => {
       
        setError("");
        setNome(nome.trim());
        setDoses(doses.trim());
        setPosologia(posologia.trim());
        setPeriodo(periodo.trim());

      try {
        
        if ( nome === "" || nome === null) {
            throw new Error("*Digite seu nome!");
    
          } else if (doses === "" || doses === null) {
            throw new Error("*Digite seu email !");
    
          } else if (posologia === "" || posologia === null) {
            throw new Error("*Digite o número de celular!");
    
          } else if (periodo === "" || periodo === null) {
                throw new Error("*Digite a senha!");
    
          } else {
            
            const medicamento = {
                "userEmail": email,
                "nome": nome ,
                "doses": doses,
                "posologia": posologia, 
                "periodo": periodo
            }

            const response = await postMedicine(medicamento, token);

            if (response === 200) {
                Alert.alert("Medicamento cadastrado!");
            } else {
                Alert.alert("Erro ao cadastrar!");
            }
          }
       
      } catch (error) {
        setError(error.message)
      } 
    }

    return (
        <View style={style.body}>
        
        <View style={style.container}>
             <Text style={style.title}>Novo medicamento</Text>
             {error ? <Text style={style.error}>{error}</Text> : null}
             <TextInput placeholder="Nome" style={style.input} onChangeText={text => setNome(text)}></TextInput>

             <View style={style.line}></View>
             <TextInput placeholder="Doses" style={style.input} onChangeText={text => setDoses(text)}></TextInput>

             <View style={style.line}></View>
             <TextInput placeholder="Posologia" style={style.input} onChangeText={text => setPosologia(text)}></TextInput>

             <View style={style.line}></View>
             <TextInput placeholder="Período" style={style.input} onChangeText={text => setPeriodo(text)}></TextInput>

             <View style={style.line}></View>
             <View style={style.button}>
                 <AppButton title='Adicionar' onPress={handleSubmit}/>
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
        marginTop: 25
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

export default Adicionar;