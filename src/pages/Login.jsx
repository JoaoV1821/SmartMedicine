import React from "react";
import { StyleSheet, Text, View, TextInput} from "react-native";
import AppButton from "../components/AppButton";
import LogoEscura from "../components/Logo";

const Login = () => {
    return  (
        <>
            <LogoEscura/>
        
            <View style={style.container}>
                <Text style={style.title}>Login</Text>
                <TextInput style={style.input} placeholder='  Email'/>
                <TextInput style={style.input} placeholder='  Senha' secureTextEntry={true} />
                <AppButton style={style.button}title="Acessar"/>
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
        position: 'relative'
    },
   
    title : {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 24,
        fontWeight: 700,
        marginTop: 20,
        marginBottom: 30
    },
    
    input: {
        backgroundColor: '#F1F5F4',
        borderRadius: 20,
        width: 255,
        height: 47,
       
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

export default Login;