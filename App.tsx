import React from 'react';
import {SafeAreaView} from 'react-native';
import Login from './src/pages/Login.jsx';
import Cadastro from './src/pages/Cadastro.jsx';

function App(): JSX.Element {
  
  return (
      <SafeAreaView>
        <Cadastro/>
      </SafeAreaView> 
  );
}

export default App;
