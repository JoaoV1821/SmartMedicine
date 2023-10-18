import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import {Card, CardMiddle} from "../components/Card.jsx";
import { useSelector } from 'react-redux';
import { onCreateTriggerNotification } from "../services/notification.js";
import { getList } from "../services/API.js";
import { getMedicines } from "../services/API.js";

const Dashboard = () => {
   const token = useSelector(state => state.authReducer.token);
   const currentUser = useSelector(state => state.currentUser);
   const [list, setList] = useState([]);
   const [medicines, setMedicines] = useState([]);
   const [nextMedication, setNextMedication] = useState({});
   const currentDate = new Date().toLocaleDateString('en-GB', {timeZone: 'UTC'});

   const handleFirstName = (name) => {
      return name.split(" ")[0];
   }

   const handleNotify = async (nome, hora, minuto) => {
      const notificationSent = await onCreateTriggerNotification(nome, hora, minuto);
      if (notificationSent) {
        console.warn("Notificação enviada!");
      }
    }

   const requestMedicines = async () => {
         try {
            const response = await getMedicines(token);

            setMedicines(response['medicamentos']);

         } catch (error) {
            setError(error.message);
         }
   }

   const requestList = async () => {
      try {
          const response = await getList(token, currentDate);
            if( response) {
               setList(response['horariosMedicamentos']);
   
            } 

      } catch(error) {
          console.warn(error.message);
      }
    }

    const requestUpcoming = () => {
      if (list.length > 0) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const upcomingMedications = list.filter((med) => {
          const [hour, minute] = med.horario.split(":").map(Number);
          const medicationTime = hour * 60 + minute;
          return medicationTime > currentTime;
        });
    
        const nextMedication = upcomingMedications[0];
        
        setNextMedication(nextMedication);
    
        upcomingMedications.forEach((med) => {
          if (!med.notificationSent) {
            
              handleNotify(
                med.nome,
                parseInt(med.horario.substr(0, 2)),
                parseInt(med.horario.substr(3, 6))
              ).then((sent) => {
                if (sent) {
                  const updatedList = list.map((item) =>
                    item.nome === med.nome ? { ...item, notificationSent: true } : item
                  );
                  setList(updatedList);
                }
              });
            
          }
        });
      }
    };

   const firstName = handleFirstName(currentUser.user.nome);

     useEffect(() => {
       requestList();
       requestMedicines(); 
   
     }, []);

     useEffect(() => {
      requestUpcoming();
    }, [list]);

     
    
   return (
    <SafeAreaView style={{backgroundColor: 'white', width: '100%', height: '100%'}}>

      <View style={style.topSection}>
         <Text style={style.title}>Olá, {firstName}</Text>
         <Card title="Próximo medicamento" nome={nextMedication == undefined ? "Nehnum medicamento para hoje" : nextMedication.nome} hora={nextMedication == undefined ? "": nextMedication.horario}/>
      </View>

      <View style={style.middleSection}></View>
      <View style={style.cards}>
        <CardMiddle title='Esquecimentos' msg='2' />
        <CardMiddle title='Medicamento mais esquecido' msg='Topiramato' />
        <CardMiddle title='Total de medicamentos' msg={medicines.length} /> 
        <CardMiddle title='Hora mais esquecida' msg="15:00" />
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
      marginLeft:10,
      marginBottom: 10
   },

   topSection : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginLeft: 20,
      
   },

   middleSection : {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 50,
      marginBottom: 15
   },

   cards : {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginRight: 10,
      marginTop: 10
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