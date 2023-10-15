import React from 'react';
import Login from './src/pages/Login.jsx';
import Cadastro from './src/pages/Cadastro.jsx';
import Atualizacao from './src/pages/Atualizacao.jsx';
import AtualizarMed from './src/pages/AtualizarMed.jsx';
import Adicionar from './src/pages/Adicionar.jsx';
import Dashboard from './src/pages/Dashboard.jsx';
import Calendario from './src/pages/Calendario.jsx';
import Configuracoes from './src/pages/Configuracoes.jsx';
import Listagem from './src/pages/Listagem.jsx';
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStore} from 'redux'
import rootReducer from './src/reducers/index.js';
import {Provider} from 'react-redux'

const store = createStore(
  rootReducer
)

const SubScreens = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='Adicionar' component={Adicionar} options={{headerShown: false}}/>
      <Stack.Screen name='Listagem' component={Listagem} options={{headerShown: false}}/>
      <Stack.Screen name='Atualizacao' component={Atualizacao} options={{headerShown: false}}/>
      <Stack.Screen name='AtualizarMed' component={AtualizarMed} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const MainScreens = () => {

  const Tab = createBottomTabNavigator();
  
  return (
   
      <Tab.Navigator initialRouteName="Dashboard"  screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveBackgroundColor: '#094275',
        tabBarActiveBackgroundColor: '#094275'
      }}>
     
        <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown: false,  
          tabBarLabel:'',  
          tabBarIcon:() => { 
              return (
                <Image source={require('./src/assets/icons/icons8-home-page-40.png') } style={{width: 35, height: 35, marginTop: 10}}  ></Image>
              ) 
            }  
          }  
        }  />


        <Tab.Screen name="Listagem" component={Listagem} options={{headerShown: false, 
         tabBarLabel:'',  
         tabBarIcon:() => { 
             return (
               <Image source={require('./src/assets/icons/icons8-pill-40.png') } style={{width: 35, height: 35, marginTop: 10}}  ></Image>
             ) 
           }  
          }
        } />
        <Tab.Screen name="Calendario" component={Calendario} options={{headerShown: false,  tabBarLabel:'',  
          tabBarIcon:() => { 
              return (
                <Image source={require('./src/assets/icons/icons8-calendar-40.png') } style={{width: 35, height: 35, marginTop: 10}}  ></Image>
              ) 
             }  
            }
          }/>
        <Tab.Screen name="Configuracoes" component={Configuracoes} options={{headerShown: false,  tabBarLabel:'',  
          tabBarIcon:() => { 
              return (
                <Image source={require('./src/assets/icons/icons8-settings-40.png') } style={{width: 35, height: 35, marginTop: 10}}  ></Image>
              ) 
            }  }}/>
        <Tab.Screen name='SubScreens' component={SubScreens} options={{headerShown: false, tabBarButton: () => null,
    }}/>
       
      </Tab.Navigator>
      
  );
}


function App(): JSX.Element {
  
  const Stack = createNativeStackNavigator();

  return (
   
    <Provider store={store}>
      <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
        <Stack.Screen name='MainScreens' component={MainScreens} options={{headerShown: false}}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    </Provider>
    
  );
 
}

export default App;
