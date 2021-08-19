import React from 'react';
import {View, Text} from 'react-native';
import styles from './SectionListItemCard.styles';

function SectionListItemCard({uuid}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>Characteristic Uuid: {uuid}</Text>
    </View>
  );
}

export default SectionListItemCard;
