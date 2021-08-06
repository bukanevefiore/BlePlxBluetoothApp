import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
    },
    line: {
        borderBottomWidth: 1,
        marginLeft: 10,
        flex: 1,
        marginTop: 3,
        borderColor: '#eceff1',
    }
})