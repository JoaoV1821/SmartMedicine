import React from "react";
import { StyleSheet, Text, TouchableHighlight} from "react-native";

const AppButton = (props) => {
    return (
        <TouchableHighlight style={style.button} onPress={props.onPress} >
           <Text style={style.text}>{props.title}</Text>
        </TouchableHighlight>
    )
}

export const SmallButton = (props) => {
    return (
        <TouchableHighlight style={style.smallButton} onPress={props.onPress} >
            <Text style={style.smallText}>{props.title}</Text>
        </TouchableHighlight>
    )
}

const style = StyleSheet.create({
    button : {
        textAlign: 'center',
        width: 255,
        height: 40,
        backgroundColor: '#094275',
        borderRadius: 20,
        
    },

    text: {
        fontFamily: 'Montsserrat',
        fontStyle: 'normal',
        fontSize: 20,
        color: '#FFFFFF', 
        textAlign: 'center',
        paddingTop: 6,
        lineHeight: 24,
    },

    smallButton : {
        textAlign: 'center',
        backgroundColor: '#094275',
        borderRadius: 20,
        width: 125,
        height: 25,
        marginLeft: 10
    },

    smallText : {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 2
    }
});

export default AppButton;