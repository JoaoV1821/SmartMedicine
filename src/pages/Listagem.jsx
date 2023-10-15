import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableHighlight, Alert, RefreshControl} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SmallButton } from "../components/AppButton";
import { useSelector } from "react-redux";
import { getMedicines } from "../services/API";
import { deleteMedicine } from "../services/API";

const Listagem = ({navigation}) => {

    const CardList = (props) => {
        return (
            <View style={style.containerList}>
                <View style={style.cardList}>
                    <Text>Nome: {props.nome}</Text>
                    <Text>Doses: {props.dose}</Text>
                    <Text>Posologia: {props.posologia}h</Text>
                    <Text>Início: {props.inicio}</Text>
                    <Text>Período: {props.periodo}</Text>
                </View>
                <TouchableHighlight onPress={() => navigation.navigate('SubScreens', {screen: "AtualizarMed", params: {id: props.id, nome: props.nome, dose: props.dose, posologia: props.posologia, periodo: props.periodo}})} >
                    <Image source={require('../assets/icons/icons8-pencil-30.png')} style={style.img}></Image>
                </TouchableHighlight>
    
                <TouchableHighlight onPress={ () => {handleDelete(props.id, props.token)}} >
                    <Image source={require('../assets/icons/icons8-waste-30.png')} style={style.img} ></Image>
                </TouchableHighlight>     
            </View>
        )
    }
    
    const token = useSelector(state => state.authReducer.token);
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false); 

    const handleDelete =  async (id, token) => {
        Alert.alert('Deseja excluir este medicamento?', "", [
        {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'Sim', onPress: () => deleteMedicine(id, token) },

        ])
    }
    const handleSearch = (text) => {
        setSearchQuery(text);
    
        const filtered = medicines.filter((medicamento) =>
            medicamento.nome.toLowerCase().startsWith(text.toLowerCase())
        );
    
        setFilteredMedicines(filtered);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setMedicines([]);
        requestMedicines();
      };
    
    const requestMedicines = async () => {
        try {
            const response = await getMedicines(token);
            const fetchedMedicines = response["medicamentos"];
            setMedicines(fetchedMedicines);
            setFilteredMedicines(fetchedMedicines);
            setRefreshing(false);
        } catch (error) {
            console.warn(error.message);
        }
    };
    
    useEffect(() => {
        requestMedicines();
    }, [])

    return (
        <View style={{backgroundColor: '#FFFF', width: '100%', height: '100%'}}>
            <Text style={style.title}>
                Medicamentos
            </Text>

            <View style={style.container}>
            <TextInput
                style={style.input}
                placeholder="Pesquisar"
                value={searchQuery}
                onChangeText={(text) => handleSearch(text)}
            />

                <Image source={require('../assets/icons/icons8-search-30.png')} style={style.img}></Image>
            </View>
                       
            <SmallButton title='Adicionar +' style={style.btn} onPress={() => navigation.navigate('SubScreens', { screen: 'Adicionar' })}/>

          
            <ScrollView style={style.list}
            
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
            >
            
            {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicamento) => (
                    <CardList 
                        key={medicamento.id} 
                        id={medicamento.id} 
                        token={token}
                        nome={medicamento.nome} 
                        dose={medicamento.qtd_dose}
                        inicio={medicamento.data_inicio}
                        posologia={medicamento.posologia}
                        periodo={medicamento.periodo_dias == "" || medicamento.periodo_dias == null ? "Uso contínuo" : `${medicamento.periodo_dias} dias`}
                    />
                ))
            ) : (
                <Text>Nenhum Medicamento encontrado!</Text>
            )}

            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({

    input: {
      
        borderRadius: 20,
        width: 280,
        height: 40,
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

    containerList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
    
})

export default Listagem;
