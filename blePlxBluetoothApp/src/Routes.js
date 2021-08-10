/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import DevicesList from './pages/DeviceList';


const Stack = createNativeStackNavigator();


function Routes() {
  return(
  
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="DevicesListt" component={DevicesListStack} 
        options= {{
          headerShown: false,
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
     
  )
}

export default Routes;

function DevicesListStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="DevicesList" component={DevicesList} 
      options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  )
}



