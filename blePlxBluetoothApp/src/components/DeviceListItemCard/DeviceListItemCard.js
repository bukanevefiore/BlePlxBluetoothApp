import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import styles from './DeviceListItemCard.styles';


function DeviceListItemCard(devices) {
    return (
        <>
        <TouchableOpacity style={styles.container}>
            <View style={styles.left_container}>
                <Image style={styles.image_left} source={devices.imageLeft} />
            </View>
            <View style={styles.center_container}>
                <Text style={styles.name}>{devices.name}</Text>
                <Text style={styles.adres}>Adress: {devices.adres}</Text>
            </View>
            <Image style={styles.image_right} source={devices.imageRight} />
        </TouchableOpacity>

        </>
    )
}

export default DeviceListItemCard;