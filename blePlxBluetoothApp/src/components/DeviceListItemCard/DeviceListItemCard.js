import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import styles from './DeviceListItemCard.styles';
import Separator from '../../components/Separator';


function DeviceListItemCard(devices) {
    return (
        <>
        <TouchableOpacity style={styles.container}>
            <View style={styles.left_container}>
                <Image style={styles.image_left} source={devices.imageLeft} />
            </View>
            <View style={styles.center_container}>
                <Text style={styles.name}>{devices.name}</Text>
                <Text style={styles.adres}>Adress: {devices.id}</Text>
            </View>
            <Image style={styles.image_right} source={devices.imageRight} />
        </TouchableOpacity>
        <Separator color='#eceff1' />
        </>
    )
}

export default DeviceListItemCard;