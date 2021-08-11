import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  line: {
    borderBottomWidth: 1,
    marginLeft: 10,
    flex: 1,
    marginTop: 3,
    borderColor: colors.acikgri,
  },
});
