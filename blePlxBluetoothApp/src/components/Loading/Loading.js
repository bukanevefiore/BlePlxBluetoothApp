import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '../../styles/colors';

function Loading() {
  return <ActivityIndicator color={colors.darkgray} />;
}

export default Loading;
