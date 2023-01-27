import React from "react";
import { StyleSheet, Image} from "react-native";


const LogoEscura = () => {
    return (
        <>
          <Image source={require('../assets/logo.png')} style={style.img} ></Image>
        </>
    )
}

const style = StyleSheet.create({
    img : {
       left: 60,
       top: 10
    }
})

export default LogoEscura;