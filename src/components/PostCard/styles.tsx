import { StyleSheet } from 'react-native';

export const postCardStyle = StyleSheet.create({
    container: {
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 5
    },
    body: {
        display: 'flex',
        flex: 1
    },
    img: {
        height: 180,
        resizeMode: 'stretch'
    },
    content: {
        padding: 5
    },
    content_title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    content_bottom: {
        display: 'flex',
        flexDirection: 'row',
    },
    content_footer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 5
    }

});
