import React from 'react';
import {Text, View} from 'react-native';
import styles from './DeviceDetails.styles';
import {useSelector} from 'react-redux';

export default function DeviceDetailPage() {
  const device = useSelector(d => d.selectedDevice);

  return (
    <View style={styles.container}>{device && <Text>{device.id}</Text>}</View>
  );
}
