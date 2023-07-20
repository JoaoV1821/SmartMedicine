import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput} from "react-native";
import AppButton from "../components/AppButton";
import LogoEscura from "../components/Logo";
import { getUsers } from "../services/API";
import { useDispatch} from 'react-redux';
import userActions from "../actions/userActions";

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  
  const  handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    setError('');
    setEmail(email.trim());
    setSenha(senha.trim());
    
    try {

      if (email === '' || email === null) {
        throw new Error("*Digite seu Email!");

    } else if (senha === '' || senha === null) {
      throw new Error("*Digite sua senha !");

    } else if (!emailRegex.test(email)) {
      throw new Error("*Email inválido!");

    } else {
          const users = await getUsers();
          const user = users?.users?.find((u) => u.email === email && u.senha === senha);

          if (user) {
              dispatch(userActions.setUser(user))
              navigation.push("MainScreens");

          } else {
              throw new Error("*Usuário inválido!");
          }
    }
    
    } catch(error) {
      setError(error.message);
    }
     
  }
  
  return (
    <View style={styles.body} >
      <LogoEscura />

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          autoCompleteType="off"
          onFocus={() => setError('')}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={text => setSenha(text)}
          onFocus={() => setError('')}
        />

        <AppButton title="Acessar" onPress={handleLogin} />
      </View>
    
      <View style={styles.line} />
      <Text style={styles.smallText} onPress={() => navigation.navigate('Cadastro')}>
        Não tem uma conta? Toque para criar uma
      </Text>
      </View>
  );
};

const styles = StyleSheet.create({

    body: {
        backgroundColor: "#fff",
        height: "100%"
    },

    container : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "50%",
        marginTop: 70,
        backgroundColor: "#fff"
    },
   
    title : {
        fontFamily: 'Montsserrat',
        color: "#094275",
        fontSize: 24,
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 30
    },
    
    input: {
        backgroundColor: '#F1F5F4',
        borderRadius: 20,
        width: 255,
        height: 47,
        paddingLeft: 20,

    },

    password: {
        width: "90%",
        height: 50,
        borderColor: 'black',
        borderWidth: 2
        
    },
    
    line: {
        borderBottomColor: '#717F7F',
        borderBottomWidth: 1,
        marginTop: 100
     
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
    }
});


export default Login;
