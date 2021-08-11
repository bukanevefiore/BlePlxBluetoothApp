/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DevicesList from './pages/DeviceList';
import DeviceDetail from './pages/DeviceDetails/DeviceDetails';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DevicesListt" component={DevicesListStack} />
        <Stack.Screen name="DeviceDetail" component={DeviceDetailStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

function DevicesListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DevicesList"
        component={DevicesList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function DeviceDetailStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeviceDetail" component={DeviceDetail} />
    </Stack.Navigator>
  );
}
