import React from 'react';
import {View, Text} from 'react-native';
import styles from './SubTitle.styles';

function SubTitle(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.line}></Text>
    </View>
  );
}

export default SubTitle;
