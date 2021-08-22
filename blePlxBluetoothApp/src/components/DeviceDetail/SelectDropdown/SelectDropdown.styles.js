import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  buton_container: {
    width: deviceSize.width / 1.09,
    borderRadius: 15,
    height: 40,
    backgroundColor: colors.fadegray,
  },
  dropdown_container: {
    width: deviceSize.width / 1.09,
    backgroundColor: 'transparent',
  },
  row_container: {
    width: deviceSize.width / 1.09,
    height: 40,
    borderRadius: 15,
    backgroundColor: colors.darkgray,
  },
  buton_text: {
    color: colors.extlightGray,
    fontSize: 17,
    fontWeight: 'bold',
  },
  row_text: {
    color: colors.lightGray,
    fontSize: 17,
  },
});
