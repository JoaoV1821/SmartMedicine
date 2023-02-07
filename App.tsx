import React from 'react';
import Login from './src/pages/Login.jsx';
import Cadastro from './src/pages/Cadastro.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App(): JSX.Element {
  
  const Stack = createNativeStackNavigator();

  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
