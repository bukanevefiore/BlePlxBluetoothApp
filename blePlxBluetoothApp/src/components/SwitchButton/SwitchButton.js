import React from 'react';
import {View, Text, Switch} from 'react-native';
import colors from '../../styles/colors';
import styles from './SwitchButton.styles';

function SwitchButton(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.value ? 'ON' : 'OFF'}</Text>
      <Switch
        style={styles.switch}
        trackColor={{false: colors.fadegray, true: colors.blacGray}}
        thumbColor={props.value ? colors.blacGray : colors.fadegray}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
}

export default SwitchButton;
