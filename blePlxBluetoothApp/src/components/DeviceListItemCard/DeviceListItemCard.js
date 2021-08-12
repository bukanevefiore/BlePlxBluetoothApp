import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './DeviceListItemCard.styles';
import Separator from '../Separator';

function DeviceListItemCard({device, onPress}) {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.left_container}>
          <Image style={styles.image_left} source={device.imageLeft} />
        </View>
        <View style={styles.center_container}>
          {device.name ? (
            <Text style={styles.name}>{device.name}</Text>
          ) : (
            <Text style={styles.name}>Device Name..</Text>
          )}
          <Text style={styles.adres}>Adress: {device.id}</Text>
        </View>
        <Image style={styles.image_right} source={device.imageRight} />
      </TouchableOpacity>
      <Separator color="#eceff1" />
    </>
  );
}

export default DeviceListItemCard;
