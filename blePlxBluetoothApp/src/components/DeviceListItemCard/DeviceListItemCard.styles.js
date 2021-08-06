import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../styles/colors';


const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        
    },
    left_container: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_left: {
        width: 20,
        height: 20
    },
    center_container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 60
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.koyugri
    },
    adres: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.solukgri
    },
    image_right: {
        width: 20,
        height: 20
    }
})