import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cardContainer: {
        margin: 5,
        borderRadius: 5,
        elevation: 10
    },
    card_body: {
        height: 80,
        flexDirection: 'row',
        elevation: 3
    },
    card_cover: {
        backgroundColor: 'blue',
        width: '35%'
    },
    cover_img: {
        height: '100%',
        width: '100%',
    },
    card_content: {
        flexGrow: 1,
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
        justifyContent:'center',
        flexDirection:'row',
        paddingVertical: 4.5
    },
    rating_star: {
        color: "#FFD700",
    },
    search_result_bottom: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageView: {
        display:"flex",
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    imageText: {
        fontWeight:'bold',
        textAlign:'center'
    }
})
