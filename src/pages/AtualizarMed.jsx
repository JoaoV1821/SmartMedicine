import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useRoute } from '@react-navigation/native';
import AppButton from "../components/AppButton";
import { updateMedicine } from "../services/API";
import { Picker } from "@react-native-picker/picker";
import DatePicker from 'react-native-date-picker'
import { SmallButton } from "../components/AppButton";

const AtualizarMed = () => {
    const token = useSelector(state => state.authReducer.token);
    const route = useRoute();
    const id = route.params.id;
    const nomeMed = route.params.nome;
    const dose = route.params.dose;
    const [nome, setNome] = useState(`${nomeMed}`);
    const [error, setError] = useState("");
    const [doses, setDoses] = useState(`${dose}`);
    const [response, setResponse] = useState({});
    const [selectedPeriod, setSelectedPeriod] = useState("Uso contínuo");
    const [selectedPosologia, setSelectedPosologia] = useState("6");
    const [hour, setHour] = useState("")
    const [open, setOpen] = useState(false)
    const posologiaOptions = ["6", "8", "12", "24"]
    const periodoOptions = ["Uso contínuo", "7", "15", "30"];
    const data = new Date();
        
    const handleUpdate = async  (medicines) => {
        try {
            const respo = await updateMedicine(id, token, medicines);
            setResponse(respo);
    
        } catch(error) {
            console.warn(error.message);
        }
    }
    
    const handleSubmit = async () => {
        
        setError("");
        setNome(nome.trim());
        setDoses(doses.trim());

        let usoContinuoValue = "0";
        let periodo = "";
        
      try {
        
        if ( nome === "" || nome === null) {
            throw new Error("*Digite o nome do medicamento!");
    
          } else if (hour === "" || hour === null) {
            throw new Error("*Selecione a hora de inicio !");

          } else if (doses === "" || doses === null) {
            throw new Error("*Digite a quatidade de doses!");
    
          } else {
        
            if (selectedPeriod === "Uso contínuo") {
                usoContinuoValue = "1";
    
            } else {
                periodo = selectedPeriod;
            }

            const medicamento = {
                "nome": nome ,
                "doses": doses,
                "posologia": selectedPosologia, 
                "periodo": periodo,
                "data": new Date(`${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`).toLocaleDateString('en-GB', {timeZone: 'UTC'}),
                "hora_inicio": hour,
                "uso_continuo": usoContinuoValue
            }

            handleUpdate(medicamento);
            
            if (response) {
                Alert.alert("Medicamento Alterado!");
            } else  {
                Alert.alert("Erro ao alterar!");
            }
          }
       
      } catch (error) {
        setError(error.message);
      } 
    }

    return (
        <View style={style.body}>
        
        <View style={style.container}>
             <Text style={style.title}>Alterar Medicamento</Text>
             {error ? <Text style={style.error}>{error}</Text> : null}
             <TextInput placeholder="Nome" style={style.input} 
             value={nome}
             onChangeText={text => setNome(text)}></TextInput>

             <View style={style.line}></View>
             <TextInput placeholder="Doses" style={style.input} 
             value={doses}
             onChangeText={text => setDoses(text)}></TextInput>

             <View style={style.line}></View>
             <View style={style.pickerContainer}>
                <TextInput placeholder="Posologia"></TextInput>
                <Picker
                    style={style.picker}
                    selectedValue={selectedPosologia}
                    onValueChange={(itemValue) => setSelectedPosologia(itemValue)}
                >
                    {posologiaOptions.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option.toString()} />
                    ))}
                </Picker>
             </View>

             <View style={style.line}></View>
             <View style={style.pickerContainer}>
                <TextInput placeholder="Período"></TextInput>
                <Picker
                    style={style.picker}
                    selectedValue={selectedPeriod}
                    onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
                >
                    {periodoOptions.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option.toString()} />
                    ))}
                </Picker>
             </View>
        
             <View style={style.line}></View>
             <View style={style.pickerContainer}>
                <TextInput placeholder="Hora início"></TextInput>
                <SmallButton title="Selecionar" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
                    open={open}
                    date={data}
                    mode="time"
                    onConfirm={(date) => {
                    setOpen(false)
                    setHour(date)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />
             </View>
            

             <View style={style.line}></View>
             <View style={style.button}>
                 <AppButton title='Atualizar' onPress={handleSubmit}/>
             </View>

        </View>
            </View>
    )

}

const style = StyleSheet.create({

    body: {
        backgroundColor: "#fff",
        height: "100%"
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "60%",
        marginTop: 50
    },

    button: {
        marginTop: 25
    },

    title: {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 24,
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 10
    },

    line: {
        borderBottomColor: '#206199',
        borderBottomWidth: 1,
        width: 250
    },

    lineBottom: {
        borderBottomColor: '#717F7F',
        borderBottomWidth: 1,
        marginTop: 95

    },

    input: {
        width: 250
    },

    smallText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color: '#717F7F',
        left: 50,
        top: 15

    },

    error : {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        color: 'red',
        right: 50,
        top: 15,
        marginBottom: 10
      },

      picker: {
        width: 190,
        height: 5,
        fontSize : 10,
        left: 30,
        borderWidth: 1,
        borderColor: "#206199",
        borderRadius: 4,
        marginTop: 10,
    }, 

    pickerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
    
})


export default AtualizarMed;
