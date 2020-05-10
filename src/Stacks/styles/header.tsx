import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#b0b8b8',
        elevation:0.5,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    headerText: {
        fontSize: 30,
        flexGrow: 4,
    },
    profileImg: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff2f2',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 3,

    },
    body: {
        flex: 9.5,
    },
});
