import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  buton_container: {
    width: deviceSize.width / 1.1,
    borderRadius: 15,
    height: 40,
    backgroundColor: colors.fadegray,
  },
});
