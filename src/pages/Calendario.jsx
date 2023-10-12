import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from 'react-native-calendars';
import { CardCalendar } from "../components/Card";
import { getList } from "../services/API";
import { useSelector } from "react-redux";

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sab'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'br';

const Calendario = () => {
  const [list, setList] = useState();
  const token = useSelector((state) => state.authReducer.token);
  const [currentDate, setDate] = useState(new Date().toLocaleDateString('en-GB', {timeZone: 'UTC'}));
  const [selected, setSelected] = useState('');

  const requestList = async () => {
    try {
        const response = await getList(token, currentDate);

        setList(response["horariosMedicamentos"]);

    } catch(error) {
        console.warn(error.message);
    }
  }
    useEffect(() => {
        requestList();
    }, [])

    return ( 
        
        <View style={{backgroundColor: '#ffff', width: '100%', height: '100%'}}>
            <Calendar 
              onDayPress={(day) => {
                setSelected(day.dateString);
                setDate(new Date(day.dateString).toLocaleDateString('pt-br', {timeZone: 'UTC'}));
                requestList()
              }}

              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              }}

              theme={{
                dayTextColor: '#717F7F',
                monthTextColor: '#094275',
                textMonthFontWeight: 'bold',
                weekRextColor: '#717F7F',
                textWeekFontWeight: 600,
                arrowColor: '#094275',
                selectedDotColor: '#094275',
              }}    
            />

            <View style={style.cardCalendar}>
              <Text style={style.title}>{`${currentDate}`}</Text>
            {
              list ? (
                list.map((list) => (
                  <CardCalendar
                    nome={list.nome}
                    hora={list.horario}
                  />
                ))
              ) : (
                <Text>Nenhum relatório para esta data</Text>
              )
            }
            </View>

        </View> 
    )
}

const style =  StyleSheet.create({
  cardCalendar: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F1F5F4',
    borderRadius: 10,
    width: 300,
    height: 230,
    marginTop: 60,
    marginLeft: 60,
    padding: 15
},

title: {
  fontWeight: 800,
  fontSize: 17
}

})

export default Calendario;
