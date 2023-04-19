import React from "react";
import { withFormik } from "formik";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import AppButton from "../components/AppButton";


const Adicionar = (props) => {
    return (
        <View style={style.body}>
        
           <View style={style.container}>
                <Text style={style.title}>Novo medicamento</Text>

                <TextInput placeholder="Nome" style={style.input} onChangeText={text => props.setFieldValue('nome', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Doses" style={style.input} onChangeText={text => props.setFieldValue('doses', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Posologia" style={style.input} onChangeText={text => props.setFieldValue('posologia', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Data de início" style={style.input} onChangeText={text => props.setFieldValue('data', text)} ></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Período" style={style.input} onChangeText={text => props.setFieldValue('periodo', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Hora" style={style.input} onChangeText={text => props.setFieldValue('hora', text)}></TextInput>

                <View style={style.line}></View>
                <View style={style.button}>
                    <AppButton title='Adicionar' onPress={props.handleSubmit}/>
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

    bottom : {
        display: "flex",
        flexDirection: "row"
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "60%",
        marginTop: 55,
    },

    button : {
        marginTop: 25
    },

    title : {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 30,
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 40
    },

    line: {
        borderBottomColor: '#206199',
        borderBottomWidth: 1,
        width: 250,
     
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
})

export default withFormik({
    mapPropsToValues: () => ({ nome: '', doses: '', posologia: '', data: '', periodo: '' , hora: ''}),
  
    handleSubmit: (values, {props}) => {
            values.nome = values.nome.trim();
            values.email = values.doses.trim();
            values.celular = values.posologia.trim();
            values.senha = values.data.trim();
            values.nomeResp = values.periodo.trim();
            
            if (values.nome === '' || values.nome === null ) {
                Alert.alert('Digite o nome do medicamento!');
            
            } else if (values.doses === '' || values.doses === null){
                Alert.alert('Digite a dose do medicamento');
              
            } else if (values.posologia === '' || values.posologia === null) {
                Alert.alert('Digite a posologia!');
               
            } else if (values.data === '' || values.data === null) {
                Alert.alert('Digite a data inicial!');
                
            } else if (values.periodo === '' || values.periodo === null) {
                Alert.alert('Digite o período!');
               
            } else if (values.hora === '' || values.hora === null) {
                Alert.alert('Digite a hora!');
            
            } else {
                Alert.alert("Medicamento adicionado!");
            }
      
        }

})(Adicionar);

