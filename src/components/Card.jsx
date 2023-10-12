import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert} from "react-native";
import { deleteMedicine } from "../services/API";

const handleDelete =  async (id, token) =>
    Alert.alert('Deseja excluir este medicamento?', "", [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => deleteMedicine(id, token), },
    ]);


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
                <Text>Período: {props.periodo}</Text>
            </View>
            <TouchableHighlight onPress={() => props.navigation.navigate('SubScreens', { screen: 'AtualizaMed' })} >
                <Image source={require('../assets/icons/icons8-pencil-30.png')} style={style.img}></Image>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => {handleDelete(props.id, props.token)}} >
                <Image source={require('../assets/icons/icons8-waste-30.png')} style={style.img} ></Image>
            </TouchableHighlight>     
        </View>
    )
}


export const CardCalendar = (props) => {
    return (
        <View>
                <Text>Medicamento: {props.nome}</Text>
                <Text>Horário: {props.hora}</Text>
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
        fontWeight: 700,
    },

    cardMiddle : {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F5F4',
        borderRadius: 10,
        width: 200,
        height: 100,
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

