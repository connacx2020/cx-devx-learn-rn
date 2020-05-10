import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation:0.5,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    headerText: {
        fontSize: 30,
        flexGrow: 4,
        backgroundColor:'red'
    },
    profileImg: {
        height: 36,
        width: 36,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff2f2',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 3,

    }
});
