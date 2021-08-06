import { StyleSheet, Dimensions } from 'react-native';


const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center'
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
        width: 40,
        height: 40
    },
    center_container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 60
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
    },
    adres: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'gray'
    },
    image_right: {
        width: 40,
        height: 40
    }
})