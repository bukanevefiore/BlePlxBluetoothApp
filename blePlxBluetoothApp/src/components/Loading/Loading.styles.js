import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: deviceSize.width,
    height: deviceSize.height,
    backgroundColor: colors.extlightGray,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
