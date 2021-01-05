import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex:1,
        flexDirection: 'column'
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        elevation: 3,
        marginTop: 20,
        marginStart: 20
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 300
    },
    topMain: {
        alignItems: 'center',
        flex: 1,
        margin: 20,
        alignSelf: 'stretch',
        flexDirection: 'column'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    nameSection: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginStart: 20
    },
    name: {
        fontSize: 25,
        fontWeight: '400',
        color: '#fff',
        marginEnd: 10,
    },
    addressSection: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    addressText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '200',
        paddingStart: 6
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        marginTop: -10,
    },
    labelText: {
        fontSize: 18,
        fontWeight: '300',
        padding: 3
    },
    aboutText: {
        fontSize: 16,
        fontWeight: '100',
        padding: 7
    },
    sourceText: {
        fontSize: 15,
    },
    linkText: {
        color: 'blue',
        fontSize: 15,
        fontWeight: '100',
        paddingEnd: 30
    }
});
