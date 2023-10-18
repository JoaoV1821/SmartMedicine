import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from 'react-native-calendars';
import { CardCalendar } from "../components/Card";
import * as RNFS from 'react-native-fs';

const readJSONFile = async () => {
  try {
    const content = await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/medicationData.json`, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    return [];
  }
};
const listaMedicamentos = readJSONFile();

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
  const [currentDate, setDate] = useState(new Date().toLocaleDateString('en-GB', {timeZone: 'UTC'}));
  const [selected, setSelected] = useState('');
  const [listaMedicamentos, setListMedicamentos] = useState([]);
  const date = new Date().toLocaleDateString('en-GB', {timeZone: 'UTC'})

  const filterDate = (day) => {
   const filterMed = listaMedicamentos.filter((med) => med['data'] === day);
    setList(filterMed);
  }

  useEffect(() => {
    const readJSONFile = async () => {
      try {
        const content = await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/medicationData.json`, 'utf8');
        const parsedData = JSON.parse(content);
        console.warn(parsedData)
        setListMedicamentos(parsedData);
      } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
      }
    };

    readJSONFile();
  }, []);

  useEffect(() => {
      filterDate(date);
  }, [listaMedicamentos]);


    return ( 
        <View style={{backgroundColor: '#ffff', width: '100%', height: '100%'}}>
            <Calendar 
              onDayPress={(day) => {
                console.warn(new Date(day.dateString).toLocaleDateString('pt-br', {timeZone: 'UTC'}))
                setSelected(day.dateString);
                setDate(new Date(day.dateString).toLocaleDateString('pt-br', {timeZone: 'UTC'}))
                filterDate(new Date(day.dateString).toLocaleDateString('pt-br', {timeZone: 'UTC'}))
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
                list.map((item) => (
                  <CardCalendar
                    key={item.id}
                    nome={item.nome}
                    hora={item.horario}
                    ingerido={item.ingeriu === true ? "Ingerido" : "Esquecido"}
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
    height: 180,
    marginTop: 10,
    fontSize: 10,
    marginLeft: 40,
    padding: 15
},

title: {
  fontWeight: 800,
  fontSize: 17
}

})

export default Calendario;
