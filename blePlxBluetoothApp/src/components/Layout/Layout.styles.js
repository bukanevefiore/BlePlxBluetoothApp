import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: colors.haki,
    height: deviceSize.height,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
