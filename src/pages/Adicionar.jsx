import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Alert} from "react-native";
import AppButton from "../components/AppButton";
import { useSelector } from 'react-redux';
import { postMedicine } from "../services/API";

const Adicionar = () => {
    const email = useSelector(state => state.currentUser.user.email);
    const token = useSelector(state => state.authReducer.token);
    const [nome, setNome] = useState("");
    const [error, setError] = useState("");
    const [doses, setDoses] = useState("");
    const [posologia, setPosologia] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [response, setResponse] = useState("");

    const handlePost = async  (medicines) => {
        try {
            const response = await postMedicine(medicines, token);
            setResponse(response);
    
        } catch(error) {
            console.warn(error.message);
        }
    }
    
    const handleSubmit = async () => {
       
        setError("");
        setNome(nome.trim());
        setDoses(doses.trim());
        setPosologia(posologia.trim());
        setPeriodo(periodo.trim());
        setHora(hora.trim());

      try {
        
        if ( nome === "" || nome === null) {
            throw new Error("*Digite o nome do medicamento!");
    
          } else if (doses === "" || doses === null) {
            throw new Error("*Digite a quatidade de doses!");
    
          } else if (posologia === "" || posologia === null) {
            throw new Error("*Digite a posologia do medicamento!");
    
          } else if (periodo === "" || periodo === null) {
                throw new Error("*Digite o perido de uso do medicamento!");

          } else {

            let usoContinuoValue = 0;
            let periodoValue = periodo

            if (periodo === "uso") {
                usoContinuoValue = 1
                periodoValue = ""
            } 
                
            const medicamento = {
                "userEmail": email,
                "nome": nome ,
                "doses": doses,
                "posologia": posologia, 
                "periodo": periodoValue,
                "data": data,
                "hora_inicio": hora,
                "uso_continuo": usoContinuoValue
            }

            handlePost(medicamento);

            if (response) {
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
             <TextInput placeholder="Data início" style={style.input} onChangeText={text => setData(text)}></TextInput>

             <View style={style.line}></View>
             <TextInput placeholder="Hora início" style={style.input} onChangeText={text => setHora(text)}></TextInput>

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

export default Adicionar;