import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        flexDirection: 'column',
        elevation: 5,
        margin: 3
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        padding: 5
    },
    info_txt: {
        fontSize: 17,
    },
    info_time: {
        fontSize: 13,
    },
    content: {
        flexDirection: 'column',
        padding: 5,
        paddingVertical: 10
    },
    content_title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    content_title_txt: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 10
    },
    content_txt: {
        padding: 5,
        fontSize: 15
    },
    footer: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 0.1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
});
