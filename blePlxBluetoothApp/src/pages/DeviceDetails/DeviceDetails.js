import React from 'react';
import {Text, View} from 'react-native';
import styles from './DeviceDetails.styles';

export default function DeviceDetailPage({route}) {
  const {id, name, rssi} = route.params;

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{rssi}</Text>
    </View>
  );
}
