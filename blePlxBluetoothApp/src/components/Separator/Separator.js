import React from 'react';
import {View} from 'react-native';
import styles from './Separator.styles';

function Separator(props) {
  return (
    <View
      style={[
        styles.separator,
        {
          borderColor: props.color ? props.color : '#eceff1',
        },
      ]}
    />
  );
}

export default Separator;
