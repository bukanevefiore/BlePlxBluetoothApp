import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './Button.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Buton = ({onPress, loading, icon, text}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Buton;
