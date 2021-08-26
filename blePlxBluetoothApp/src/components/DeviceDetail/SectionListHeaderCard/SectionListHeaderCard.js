import React from 'react';
import {Text} from 'react-native';
import styles from './SectionListHeaderCard.styles';

function SectionListHeaderCard({title}) {
  return <Text style={styles.header}>Service Uuid: {title}</Text>;
}

export default SectionListHeaderCard;
