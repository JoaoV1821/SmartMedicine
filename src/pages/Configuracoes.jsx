import React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";

const Configuracoes = (props) => {
    return (
        <View>
            <Text style={style.title}>
                Configurações
            </Text>

            <Text style={style.link}>Atualizar dados</Text>

            <View style={style.container}>
                <Text style={style.link}>Notificações</Text> 

                <Switch></Switch>
            </View>
            

            <Text style={style.link}>Sobre</Text>

            
            
        </View>
    )
}

const style = StyleSheet.create({
    title : {
        fontSize: 30,
        color: '#094275',
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 20
    },

    link : {
        fontSize : 20,
        marginLeft: 20,
        marginBottom: 20
    },

    container : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
export default Configuracoes;
