import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    brandField: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contextField: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    brandText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    inputField: {
        width: 300,
        borderBottomWidth: 2,
        height: 40,
        borderColor: '#34eb61',
        marginVertical: 20,
    },
    inputFieldInvalid: {
        width: 300,
        borderBottomWidth: 2,
        height: 40,
        borderColor: '#f2161d',
        marginVertical: 20,
    },
    btn: {
        marginVertical: 20,
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 15,
        padding: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    invalid: {
        color: '#f24147',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
