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
    search_result_left: {
        display:"flex",
        flex:1,
        flexDirection:"column",
        justifyContent:'center',
        backgroundColor:'#2289f0',
        alignItems:'center'
    },
    search_result_left_text: {
        color:'#fff',
        fontWeight:'bold',
        textAlign:'center'
    }
})
