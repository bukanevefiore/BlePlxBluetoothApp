import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from '../../styles/colors';
import styles from './Loading.styles';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.darkgray} size={50} />
    </View>
  );
}

export default Loading;
