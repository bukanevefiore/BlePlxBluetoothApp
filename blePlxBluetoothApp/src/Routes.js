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
import DeviceFeatureProvider from './context/provider';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <DeviceFeatureProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="DevicesList" component={DevicesList} />
          <Stack.Screen name="DeviceDetail" component={DeviceDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </DeviceFeatureProvider>
  );
}

export default Routes;
