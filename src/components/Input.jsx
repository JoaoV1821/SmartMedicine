import React from "react";
import { StyleSheet, TextInput} from "react-native";

const Input = (props) => {
    <TextInput placeholder={props.text} style={style.input}/>
}

const style = StyleSheet.create({
    input: {
        backgroundColor: '#F1F5F4',
        borderRadius: 20,

    }
})
export default Input
