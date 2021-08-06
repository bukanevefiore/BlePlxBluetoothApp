import React from 'react';
import { View, Text, Switch } from 'react-native';
import styles from './SwitchButton.styles';


function SwitchButton(props) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.value ? 'ON' : 'OFF'}</Text>
            <Switch style={styles.switch} value={props.value} 
            onValueChange={props.onValueChange}/>
        </View>
    )
}

export default SwitchButton;