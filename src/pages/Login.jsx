import React from "react";
import { withFormik} from "formik";
import { StyleSheet, Text, View, TextInput, Alert} from "react-native";
import AppButton from "../components/AppButton";
import LogoEscura from "../components/Logo";

const Login = (props) => {

    return  (
        <>
            <LogoEscura/>
        
            <View style={style.container}>

                <Text style={style.title}>Login</Text>
                <TextInput style={style.input} placeholder='Email' keyboardType="email-address" value={props.values.email} onChangeText={text => props.setFieldValue('email', text)}/>
                <TextInput style={style.input} placeholder='Senha' secureTextEntry={true} value={props.values.senha} onChangeText={text => props.setFieldValue('senha', text)} />

                <AppButton title="Acessar" onPress={props.handleSubmit}/>
               
            </View>
            
            <View style={style.line}/>
            <Text style={style.smallText}>Não tem uma conta? Toque para criar uma</Text>
        </>
    ) 
}

const style = StyleSheet.create({

    container : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "55%",
        marginTop: 70,
    },
   
    title : {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 24,
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 30
    },
    
    input: {
        backgroundColor: '#F1F5F4',
        borderRadius: 20,
        width: 255,
        height: 47,
        paddingLeft: 20
       
    },

    password: {
        width: "90%",
        height: 50,
        borderColor: 'black',
        borderWidth: 2
        
    },

    line: {
        borderBottomColor: '#717F7F',
        borderBottomWidth: 1,
        marginTop: 90
     
    },

    smallText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color: '#717F7F',
        left: 50,
        top: 10

    }, 

});

export default withFormik({
    mapPropsToValues: () => ({ email: '', senha: '' }),
  
    handleSubmit: (values) => {
      if (values.email === ''  || values.email === null) {
       Alert.alert('Digite seu Email!');

      } else if (values.senha === '' || values.senha === null){

        Alert.alert('Digite sua senha!');
    
      } else {

        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        const ehValido = emailRegex.test(values.email);

            if(!ehValido) {
                Alert.alert("Email inválido!");
    
            } else {
                Alert.alert(values);
            }

        }
       
    }

})(Login);



