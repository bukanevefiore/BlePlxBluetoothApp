import React from 'react';
import {Text, View} from 'react-native';
import styles from './DeviceDetails.styles';
import {useSelector} from 'react-redux';

export default function DeviceDetailPage({route}) {
  const {id, name, rssi} = route.params;
  const data = useSelector(d => d.list);

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{rssi}</Text>
    </View>
  );
}
