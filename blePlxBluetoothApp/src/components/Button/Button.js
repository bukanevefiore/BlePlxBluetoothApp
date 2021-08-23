import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './Button.styles';

const Buton = ({onPress, loading, text}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color="white"
          size={20}
          style={styles.loading}
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Buton;
