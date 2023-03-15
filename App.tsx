import React from 'react';
import Login from './src/pages/Login.jsx';
import Cadastro from './src/pages/Cadastro.jsx';
import Atualizacao from './src/pages/Atualizacao.jsx';
import Dashboard from './src/pages/Dashboard.jsx';
import Calendario from './src/pages/Calendario.jsx';
import Configuracoes from './src/pages/Configuracoes.jsx';
import Listagem from './src/pages/Listagem.jsx';
import Adicionar from './src/pages/Adicionar.jsx';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

const MainScreens = () => {

  const Tab = createBottomTabNavigator();
 
  return (
   
      <Tab.Navigator initialRouteName="Dashboard"  screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveBackgroundColor: '#094275',
        tabBarActiveBackgroundColor: '#094275'
      }}>
     
        <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown: false,} }  />
        <Tab.Screen name="Listagem" component={Listagem} options={{headerShown: false}}/>
        <Tab.Screen name="Calendario" component={Calendario} options={{headerShown: false}}/>
        <Tab.Screen name="Configuracoes" component={Configuracoes} options={{headerShown: false}}/>
        
      </Tab.Navigator>
      
  );
}


function App(): JSX.Element {
  
  const Stack = createNativeStackNavigator();

  return (
   
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
        <Stack.Screen name='MainScreens' component={MainScreens} options={{headerShown: false}}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
 
}

export default App;
