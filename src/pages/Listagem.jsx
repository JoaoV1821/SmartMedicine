import React from "react";
import { Text, View, StyleSheet, ScrollView, Image} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SmallButton } from "../components/AppButton";
import { CardList } from "../components/Card";

const Listagem = (props) => {
    return (
        <View style={{backgroundColor: '#FFFF', width: '100%', height: '100%'}}>
            <Text style={style.title}>
                Medicamentos
            </Text>

            <View style={style.container}>
                <TextInput style={style.input} placeholder='Pesquisar'/>
                <Image source={require('../assets/icons/icons8-search-30.png')} style={style.img}></Image>
            </View>
           
            <SmallButton title='Adicionar +' style={style.btn}/>

            <ScrollView style={style.list}>
                <CardList nome="Prednisona" dose="2" inicio="06/03/2023" posologia="12" periodo="15"/>
                <CardList nome="Prednisona" dose="2" inicio="06/03/2023" posologia="12" periodo="15"/>
                <CardList nome="Prednisona" dose="2" inicio="06/03/2023" posologia="12" periodo="15"/>
                <CardList nome="Prednisona" dose="2" inicio="06/03/2023" posologia="12" periodo="15"/>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({

    input: {
      
        borderRadius: 20,
        width: 280,
        height: 35,
        marginLeft: 10,
        marginBottom: 15,
        paddingLeft: 20,
    },

    container : {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F1F5F4',
        borderRadius: 20,
        height: 40,
        width: 350,
        padding: 4,
        marginBottom: 20,
        marginLeft: 5
    },

    title : {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 35,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },

    btn: {
        marginLeft: 30
    }, 

    list: {
        marginTop: 15,
        backgroundColor: '#ffffff',

    },

    img : {
        marginRight: 10
    }
    
})

export default Listagem;
