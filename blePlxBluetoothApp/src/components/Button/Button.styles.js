import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.darkgray,
    marginHorizontal: 5,
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    padding: 10,
  },
});
