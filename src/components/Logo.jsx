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
       top: 40
    }
})

export default LogoEscura;