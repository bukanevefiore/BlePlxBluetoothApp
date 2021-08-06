import React from 'react';
import { View, Text } from 'react-native';
import styles from './SwitchButton.styles';


function SwitchButton({value, onValueChange}) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{value ? 'ON' : 'OFF'}</Text>
            <Switch style={styles.switch} value={value} 
            onValueChange={onValueChange}/>
        </View>
    )
}

export default SwitchButton;