import React from 'react';
import { View, Text } from 'react-native';
import styles from './DevicesCard.styles';


function DevicesCard({devices}) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{devices.name}</Text>
            <Text style={styles.adres}>{devices.adres}</Text>
        </View>
    )
}

export default DevicesCard;