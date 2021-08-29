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
    height: deviceSize.height / 2.2,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  input_container: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.extlightGray,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left_text: {
    fontSize: 19,
    color: colors.blacGray,
    fontWeight: 'bold',
  },
  right_text: {
    fontSize: 16,
    color: colors.darkgray,
    fontWeight: 'bold',
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 10,
  },
});
