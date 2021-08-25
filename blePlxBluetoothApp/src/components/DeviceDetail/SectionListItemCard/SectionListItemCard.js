import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './SectionListItemCard.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SectionListItemCard({uuid, onPress, iconSelected}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>Characteristic Uuid: {uuid}</Text>
      <Icon
        name="arrow-bottom-left-bold-outline"
        size={25}
        onPress={iconSelected}
      />
    </TouchableOpacity>
  );
}

export default SectionListItemCard;
