import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './DeviceListEmpty.styles';

function DeviceListEmpty({text}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/ic_empty2.png')}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default DeviceListEmpty;
