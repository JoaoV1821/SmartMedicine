import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from 'react-native-calendars';
import { CardCalendar } from "../components/Card";

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
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sab'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'br';

const Calendario = (props) => {

    return ( 
        
        <View style={{backgroundColor: '#ffff', width: '100%', height: '100%'}}>
            <Calendar 
        onDayPress={(day) => {
          
        markedDay = day.dateString;
        
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

        <CardCalendar data="13 de março" medInfo='Prednisona: 8:30 (ingerido) / 22:30 (ingerido)'/>
                  
        </View>
            
    )
}

export default Calendario;
