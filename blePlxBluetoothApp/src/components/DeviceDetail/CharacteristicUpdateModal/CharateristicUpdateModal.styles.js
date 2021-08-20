import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.extlightGray,
    padding: 15,
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: deviceSize.width,
    height: deviceSize.height / 2.4,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  input_container: {
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
  },
  left_text: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  right_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
