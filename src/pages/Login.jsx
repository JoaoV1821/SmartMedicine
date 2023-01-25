import React from "react";
import { StyleSheet, Text, View, TextInput} from "react-native";
import AppButton from "../components/AppButton";


const Login = () => {
    return  (
        <View>
            <Text style={style.title}>Login</Text>
            <TextInput style={style.input} placeholder='  Email'/>
            <TextInput style={style.input} placeholder='  Senha'/>
            <AppButton title="Acessar"/>
            <View style={style.line}/>
            <Text style={style.smallText}>Não tem uma conta? Toque para criar uma</Text>
        </View>
    ) 
}

const style = StyleSheet.create({
    title : {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 24,
        fontWeight: 700,
        textAlign: "center",
        lineHeight: 29,
        position: 'absolute',
        width: 224,
        height: 59,
        left: 58,
        top: 140

    },

    input: {
        backgroundColor: '#F1F5F4',
        borderRadius: 20,
        width: 255,
        height: 47,
        left: 53,
        top: 200,
        marginTop: 20,

    },

    line: {
        
        borderBottomColor: '#717F7F',
        borderBottomWidth: 1,
        top: 330
          
    },

    smallText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        top: 350,
        left: 40,
        color: '#717F7F'

    }

});

export default Login;