import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import Profile from '../Profile';
import Register from '../Register';
import Accueil from '../Accueil';
import Addvideo from '../addvideo';
const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}> 
      <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Accueil" component={Accueil} />
        
       <Stack.Screen name="Profile" component={Profile} />
    
      <Stack.Screen name="Register" component={Register} />
      
      
     
      
      <Stack.Screen name="Addvideo" component={Addvideo} />
     
     
    
      
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;