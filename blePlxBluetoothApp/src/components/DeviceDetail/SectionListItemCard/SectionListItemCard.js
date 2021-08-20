import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './SectionListItemCard.styles';

function SectionListItemCard({uuid, onPress}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>Characteristic Uuid: {uuid}</Text>
    </TouchableOpacity>
  );
}

export default SectionListItemCard;
