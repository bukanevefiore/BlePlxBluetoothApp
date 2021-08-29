import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.extlightGray,
    height: 50,
    marginVertical: 4,
    marginHorizontal: 10,
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: colors.fadegray,
    marginLeft: 18,
  },
  title: {
    fontSize: 20,
    color: colors.blacGray,
    padding: 10,
  },
  icon: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
