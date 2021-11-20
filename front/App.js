import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './screens/Login';
import { Registro } from './screens/Registro';
import { Principal } from './screens/Principal';
import { Details } from './screens/Details';
import { Hospitais } from './screens/Hospitais';
import { Hospitalregistro } from './screens/Hospitalregistro';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Principal" options={{ headerShown: false }} component={Principal} />
      <Stack.Screen name="Hospitais" options={{ headerShown: false }} component={Hospitais} />
      <Stack.Screen name="Registro" options={{ headerShown: false }} component={Registro} />
      <Stack.Screen name="Hospitalregistro" options={{ headerShown: false }} component={Hospitalregistro} />
      <Stack.Screen name="Details" options={{ headerShown: false }} component={Details} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
}