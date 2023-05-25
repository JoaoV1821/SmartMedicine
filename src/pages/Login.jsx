import React from "react";
import { withFormik } from "formik";
import { StyleSheet, Text, View, TextInput, Alert} from "react-native";
import AppButton from "../components/AppButton";
import LogoEscura from "../components/Logo";
import { getUsers } from "../services/API";


const Login = (props) => {
    return  (
        <View style={style.body}>
            <LogoEscura/>
            
            <View style={style.container}>

                <Text style={style.title}>Login</Text>
                <TextInput style={style.input} placeholder='Email' keyboardType="email-address" value={props.values.email} onChangeText={text => props.setFieldValue('email', text)} autoComplete="off"/>
                <TextInput style={style.input} placeholder='Senha' secureTextEntry={true} value={props.values.senha} onChangeText={text => props.setFieldValue('senha', text)} />

                <AppButton title="Acessar" onPress={props.handleSubmit} />
               
            </View>
            
            <View style={style.line}/>
            <Text style={style.smallText} onPress={() => props.navigation.navigate('Cadastro')}>Não tem uma conta? Toque para criar uma</Text>
        </View>
    ) 
}

const style = StyleSheet.create({

    body: {
        backgroundColor: "#fff",
        height: "100%"
    },

    container : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "50%",
        marginTop: 70,
        backgroundColor: "#fff"
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
        paddingLeft: 20,

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
        marginTop: 100
     
    },

    smallText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color: '#717F7F',
        left: 50,
        top: 15
    }, 
});


export default withFormik({
    mapPropsToValues: () => ({ email: '', senha: '' }),
  
    handleSubmit: async (values, {props}) => {
        try {
          if (values.email.trim() === '' || values.email === null) {
            throw new Error('Digite seu email!')
          }
           if (values.senha.trim() === '' || values.senha === null) {
            throw new Error('Digite sua senha!')
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
          if (!emailRegex.test(values.email)) {
            throw new Error('Email inválido!')
          }
          const users = await getUsers();
          const user = users?.users?.find((u) => u.email === values.email && u.senha === values.senha);
          
           if (user) {
            props.navigation.push('MainScreens');
          } else {
            throw new Error('Usuário inválido!')
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      },

})(Login);






