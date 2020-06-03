import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card_body: {
        height: 140,
        backgroundColor: 'blue',
        flexDirection: 'row',
        marginVertical: 5,
        elevation: 2
    },
    card_cover: {
        flexGrow: 1,
        backgroundColor: 'white',
        width: '50%'
    },
    cover_img: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch'
    },
    card_content: {
        flexGrow: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        width: "50%",
        justifyContent: 'space-around',
        padding: 7
    },
    content_title: {
        fontSize: 15,
        lineHeight: 20
    },
    content_paragraph: {
        fontSize: 13,
        fontStyle: 'italic'
    },
    rating_star: {
        color: "#FFD700"
    }
})