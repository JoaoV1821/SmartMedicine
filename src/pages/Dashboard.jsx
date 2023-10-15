import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Card, CardMiddle } from "../components/Card.jsx";
import { useSelector } from 'react-redux';
import { onCreateTriggerNotification } from "../services/notification.js";
import { getList } from "../services/API.js";

const Dashboard = () => {
  const token = useSelector(state => state.authReducer.token);
  const currentUser = useSelector(state => state.currentUser);
  const currentDate = new Date().toLocaleDateString('en-GB', { timeZone: 'UTC' });
  const firstName = currentUser.user.nome.split(" ")[0];

  const [list, setList] = useState([]);
  const [nextMedication, setNextMedication] = useState(null);

  const handleNotify = async (nome, hora) => {
    await onCreateTriggerNotification(nome, hora);
  }

  const requestList = async () => {
    try {
      const response = await getList(token, currentDate);
      setList(response?.horariosMedicamentos || []);
    } catch (error) {
      console.warn(error.message);
    }
  }

  useEffect(() => {
    requestList();
  }, [])

  useEffect(() => {
    if (list.length > 0) {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const upcomingMedications = list
        .map(med => {
          const [hour, minute] = med.horario.split(':').map(Number);
          return { ...med, time: hour * 60 + minute };
        })
        .filter(med => med.time > currentTime);

      if (upcomingMedications.length > 0) {
        const nextMedication = upcomingMedications[0];
        setNextMedication(nextMedication);
        handleNotify(nextMedication.nome, nextMedication.horario);
      }
    }
  }, [list]);

  const totalMedications = new Set(list).size;

  return (
    <SafeAreaView style={style.container}>
      <View style={style.topSection}>
        <Text style={style.title}>Olá, {firstName}</Text>
        {nextMedication && (
          <Card title="Próximo medicamento" nome={nextMedication.nome} hora={nextMedication.horario} />
        )}
      </View>

      <View style={style.middleSection}>
        <Text style={style.title2}>Relatório de uso</Text>
        <Image source={require('../assets/icons/icons8-graph-report-30.png')} style={style.img} />
      </View>

      <View style={style.cards}>
        <CardMiddle title='Esquecimentos' msg='2' />
        <CardMiddle title='Medicamento mais esquecido' msg='Topiramato' />
        <CardMiddle title='Total de medicamentos' msg={totalMedications.toString()} />
        <CardMiddle title='Frequência' msg="30 dias" />
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
