import React from "react";
import { StyleSheet, View, Image, SafeAreaView} from "react-native";
import { Link } from '@react-navigation/native';

const NavBar = (props) => {
    return (
        <SafeAreaView>
            <View style={style.container}>
                <Link to={{screen: 'Dashboard'}}>
                    <Image source={require('../assets/icons/icons8-home-page-40.png')} style={style.img}></Image>
                </Link>
               
               <Link to={{screen: 'Listagem'}}>
                    <Image source={require('../assets/icons/icons8-pill-40.png')} style={style.img}></Image>
               </Link>
               
                <Link to={{ screen: 'Calendario' }}>
                    <Image source={require('../assets/icons/icons8-calendar-40.png')} style={style.img}></Image>
                </Link>
                
                <Link to={{ screen: 'Configuracoes' }}>
                    <Image source={require('../assets/icons/icons8-settings-40.png')} style={style.img}></Image>
                </Link>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#094275',
       
    },

    img: {
        width: 30,
        height: 30
    }

})

export default NavBar
