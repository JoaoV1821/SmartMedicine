import React from "react";
import { withFormik } from "formik";
import { StyleSheet, Text, View, TextInput, Alert, Image } from "react-native";
import AppButton from "../components/AppButton";
import LogoEscura from "../components/Logo";


const Atualizacao = (props) => {
    return (
        <View style={style.body}>
           <LogoEscura/>

           <View style={style.container}>
                <Text style={style.title}>Atualizar Dados</Text>

                <TextInput placeholder="Nome" style={style.input} onChangeText={text => props.setFieldValue('nome', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Email" style={style.input} keyboardType="email-address" onChangeText={text => props.setFieldValue('email', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Celular" style={style.input} keyboardType="phone-pad" onChangeText={text => props.setFieldValue('celular', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Senha" style={style.input} secureTextEntry={true} onChangeText={text => props.setFieldValue('senha', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Nome do responsável" style={style.input} onChangeText={text => props.setFieldValue('nomeResp', text)}></TextInput>

                <View style={style.line}></View>
                <TextInput placeholder="Contato do responsável" style={style.input} keyboardType="phone-pad" onChangeText={text => props.setFieldValue('contatoResp', text)}></TextInput>

                <View style={style.line}></View>
                <View style={style.button}>
                    <AppButton title='Atualizar' onPress={props.handleSubmit}/>
                </View>

           </View>
           <View>
            <Image source={require('../assets/icons/icons8-u-vire-para-a-esquerda-48.png')} style={style.img} ></Image>
            <Text>Voltar</Text>
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

    img: {
        top: 95,
        left: 20,
        width: 30,
        height: 30
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "60%",
        marginTop: 25,
    },

    button : {
        marginTop: 25
    },

    title : {
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
    mapPropsToValues: () => ({ nome: '', email: '', celular: '', senha: '', nomeResp: '', contatoResp: '' }),
  
    handleSubmit: (values, {props}) => {
            values.nome = values.nome.trim();
            values.email = values.email.trim();
            values.celular = values.celular.trim();
            values.senha = values.senha.trim();
            values.nomeResp = values.nomeResp.trim();
            values.contatoResp = values.contatoResp.trim();

            if (values.nome === '' || values.nome === null ) {
                Alert.alert('Digite seu nome!');
            
            } else if (values.email === '' || values.email === null){
                Alert.alert('Digite seu email!');
              
            } else if (values.celular === '' || values.celular === null) {
                Alert.alert('Digite seu celular!');
               
            } else if (values.senha === '' || values.senha === null) {
                Alert.alert('Digite sua senha!');
                
            } else if (values.nomeResp === '' || values.nomeResp === null) {
                Alert.alert('Digite o nome do seu responsável!');
               
            } else if (values.contatoResp === '' || values.contatoResp === null) {
                Alert.alert('Digite o contato de seu responsável!');
            
            } else {

                const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
                const celRegex = new RegExp(/^([0-9]{2})(([0-9]{7})|(9[0-9]{8}))+$/, "gm");
                 
                if (!emailRegex.test(values.email)) {
                    Alert.alert("Email inválido!");
                    
                } else if (celRegex.test(values.celular) === false) {
                    Alert.alert("Número de celular inválido!");
                    console.warn(celRegex.test(values.celular));
                    
                } else {
                    props.navigation.navigate('Login');
                }
            }
      
        }

})(Atualizacao);
