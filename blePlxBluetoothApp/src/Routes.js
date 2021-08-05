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
import { createDrawerNavigator } from '@react-navigation/drawer';
import DevicesList from './pages/DeviceList';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="DevicesList" component={DevicesListStack} />

      </Drawer.Navigator>
    </NavigationContainer>
  )
}


function DevicesListStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="DevicesList" component={DevicesList} />
    </Stack.Navigator>
  )
}