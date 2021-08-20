import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './DeviceListItemCard.styles';

function DeviceListItemCard({device, onPress, imageLeft, imageRight}) {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.left_container}>
          <Image style={styles.image_left} source={imageLeft} />
        </View>
        <View style={styles.center_container}>
          {device.name ? (
            <Text style={styles.name}>{device.name}</Text>
          ) : (
            <Text style={styles.name}>Device Name..</Text>
          )}
          <Text style={styles.adres}>Adress: {device.id}</Text>
        </View>
        <Image style={styles.image_right} source={imageRight} />
      </TouchableOpacity>
    </>
  );
}

export default DeviceListItemCard;
