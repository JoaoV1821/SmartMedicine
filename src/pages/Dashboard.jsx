import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import {Card, CardMiddle} from "../components/Card.jsx";
import { useSelector } from 'react-redux';

const Dashboard = () => {
  

   const currentUser = useSelector(state => state.currentUser);
   const authToken = useSelector((state) => state.authReducer);

   const handleFirstName = (name) => {
      return name.split(" ")[0];
   }
   
   const firstName = handleFirstName(currentUser.user.nome);

   return (
    <SafeAreaView style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      
      <View style={style.topSection}>
         <Text style={style.title}>Olá, {firstName}</Text>
         <Card title="Próximo medicamento" nome="Prednisona" hora="15:30"/>
      </View>

      <View style={style.middleSection}>
         <Text style={style.title2}>Relatório de uso</Text>
         <Image source={require('../assets/icons/icons8-graph-report-30.png')} style={style.img}></Image>
      </View>

      <View style={style.cards}>
         <CardMiddle title='Esquecimentos' msg='2'/>
         <CardMiddle title='Medicamento mais esquecido' msg='Topiramato'/> 
         <CardMiddle title='Total de medicamentos' msg="2"/>
         <CardMiddle title='Frequência' msg="30 dias"/>
      </View>
        
    </SafeAreaView>
   
   )
}

const style = StyleSheet.create({
   title: {
      fontFamily: 'Montsserrat',
      color: "#094275",
      fontSize: 40,
      fontWeight: 600,
      marginTop: 15,
      marginLeft:5,
      marginBottom: 10
   },

   topSection : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginLeft: 20,
      marginTop: 30
      
   },

   middleSection : {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 100,
      marginBottom: 15
   },

   cards : {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginRight: 10,
      marginTop: 50
   },

   footer : {
      width: '100%',
      height: '50%',
      top: '5%'
   }, 

   title2 : {
      fontSize: 30,
      color: "#094275",
   },

   img : {
      marginRight: 30
   }
});

export default Dashboard;
