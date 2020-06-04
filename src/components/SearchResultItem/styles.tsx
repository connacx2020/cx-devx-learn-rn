import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card_body: {
        height: 80,
        backgroundColor: 'blue',
        flexDirection: 'row',
        elevation: 3
    },
    card_cover: {
        backgroundColor: 'white',
        width: '35%'
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
        padding: 7,
    },
    content_title: {
        fontSize: 15,
        lineHeight: 15,
    },
    content_paragraph: {
        fontSize: 13,
        fontStyle: 'italic',
    },
    rating_field:{
       width:20
    },
    rating_star: {
        color: "#FFD700"
    }
})