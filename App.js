import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetalleCliente from './views/DetalleCliente';
import Barra from './components/ui/Barra';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent : '#0655BF'
  }
}

//console.log(theme);

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle: {
              backgroundColor : theme.colors.primary
            },
            headerTintColor : theme.colors.surface,
            headerTitleStyle :{
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name = 'Inicio'
            component = {Inicio}
            options={({navigation, route})=> ({
              headerTitleAlign : 'center',
              headerLeft:(props)=> <Barra {...props}
                                navigation = {navigation}
                                route = {route}
                              />
            })}
          />
          <Stack.Screen
            name = 'NuevoCliente'
            component = {NuevoCliente}
            options={{
              title : 'Nuevo Cliente'
            }}
          />
          <Stack.Screen
            name = 'DetalleCliente'
            component = {DetalleCliente}
            options={{
              title : 'Detalle Cliente'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
