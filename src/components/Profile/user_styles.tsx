import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex'
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
        margin:20,
        alignSelf:'stretch',
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
        marginTop: 20
    },
    name: {
        fontSize: 25,
        fontWeight: '400',
        color: '#fff',
        marginEnd: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
});
