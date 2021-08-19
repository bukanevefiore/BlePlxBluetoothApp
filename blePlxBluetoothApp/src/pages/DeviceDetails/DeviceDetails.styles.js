import {StyleSheet, StatusBar} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: colors.haki,
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 10,
    marginLeft: 13,
    opacity: 0.8,
  },
  header: {
    fontSize: 24,
    backgroundColor: colors.darkgray,
    marginRight: 170,
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.4,
    marginLeft: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
});
