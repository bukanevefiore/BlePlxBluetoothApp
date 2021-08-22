import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray,
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: colors.extlightGray,
    fontSize: 18,
    padding: 10,
  },
});
