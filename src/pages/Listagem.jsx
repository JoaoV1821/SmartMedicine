import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SmallButton } from "../components/AppButton";
import { CardList } from "../components/Card";
import { useSelector } from "react-redux";
import { getMedicines } from "../services/API";


const medicamentos = [
    {
        nome: 'prednisona',
        doses: '2',
        posologia: '12',
        inicio: '12/12/2021',
        periodo: '7'
    },

    {
        nome: 'prednisona',
        doses: '2',
        posologia: '12',
        inicio: '12/12/2021',
        periodo: '7'
    },

    {
        nome: 'prednisona',
        doses: '2',
        posologia: '12',
        inicio: '12/12/2021',
        periodo: '7'
    }
]


const Listagem = (props) => {
    const token = useSelector(state => state.authReducer.token);
    const [medicines, setMedicines] = useState([]);

    const requestMedicines = async () => {
        try {
            const response = await  getMedicines(token);
    
            setMedicines(response);
        } catch(error) {
            console.warn(error.message);
        }
        
    }

    useEffect(() => {
        requestMedicines();
    }, [])
    
    return (
        <View style={{backgroundColor: '#FFFF', width: '100%', height: '100%'}}>
            <Text style={style.title}>
                Medicamentos
            </Text>

            <View style={style.container}>
                <TextInput style={style.input} placeholder='Pesquisar'/>
                <Image source={require('../assets/icons/icons8-search-30.png')} style={style.img}></Image>
            </View>
           
            <SmallButton title='Adicionar +' style={style.btn} onPress={() => props.navigation.navigate('SubScreens', { screen: 'Adicionar' })}/>
            
            <ScrollView style={style.list}>
                <Text>
                    {medicines}
                </Text>
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
