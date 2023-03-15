import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert} from "react-native";

export const Card = (props) => {
    return (
        <View style={style.card}>
                <Text style={style.title}>{props.title}</Text>
                <Text>{props.nome}</Text>
                <Text>{props.hora}</Text>
        </View>
    )
}

export const CardMiddle = (props) => {
    return (
        <View style={style.cardMiddle}>
                <Text style={style.title}>{props.title}</Text>
                <Text>{props.msg}</Text>
        </View>
    )
}

export const CardList = (props) => {
    return (
        <View style={style.container}>
            <View style={style.cardList}>
                <Text>Nome: {props.nome}</Text>
                <Text>Doses: {props.dose}</Text>
                <Text>Posologia: {props.posologia}h</Text>
                <Text>Início: {props.inicio}</Text>
                <Text>Período: {props.periodo} dias</Text>
            </View>
            <TouchableHighlight onPress={props.onPress} >
                <Image source={require('../assets/icons/icons8-pencil-30.png')} style={style.img}></Image>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => {Alert.alert('Deseja excluir este medicamento?')}} >
                <Image source={require('../assets/icons/icons8-waste-30.png')} style={style.img}></Image>
            </TouchableHighlight>     
        </View>
     
    )
}


export const CardCalendar = (props) => {
    return (
        <View style={style.container}>

            <View style={style.cardCalendar}>
                <Text style={style.title}>{props.data}</Text>
                <Text>{props.medInfo}</Text>
            </View>
           
        </View>
    )
}

const style = StyleSheet.create({
    card : {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F5F4',
        borderRadius: 10,
        width: 209,
        height: 82,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
        padding: 10,
        marginTop: 10
    },

    container : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    title: {
        fontWeight: 600,
    },

    cardMiddle : {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F5F4',
        borderRadius: 10,
        width: 130,
        height: 90,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
        padding: 10,
    },

    cardList : {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F5F4',
        borderRadius: 10,
        width: 209,
        height: 120,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 10,
        padding: 10,
        marginBottom: 15,
    },

    cardCalendar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F5F4',
        borderRadius: 10,
        width: 300,
        height: 130,
        marginTop: 20,
        padding: 10
    }

});

