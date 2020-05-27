import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    container:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor:'white',
    },
    header:{
        flexGrow:1,
        height:80,
        flexDirection:'row',
        elevation: 0.8
    },
    header_avatar_lfield:{
        width:"15%",
        justifyContent:'center',
        alignItems:'center',
        flexGrow:2,
    },
    avatar:{
        width:'65%',
        height:"80%",
        borderRadius:100
    },
    header_info_rfield:{
        marginVertical:10,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexGrow:4,
        flexDirection:'column'
    },
    info_txt:{
        fontSize:20,
        fontStyle:'italic'
    },
    info_time:{
        fontSize:18,
        fontWeight:'bold'
    },
    content:{
        marginHorizontal:15,
        marginVertical:10,
        padding:20,
        flexGrow:10,

    },
    content_title:{
        fontWeight:'bold',
        fontSize:25
    },
    content_title_txt:{
        fontWeight:'bold',
        fontSize:20,
        paddingVertical:10
    },
    content_txt:{
        padding:5,
        fontSize:17
    },
    footer:{
        flexDirection:'row',
        flexGrow:1,
        height:50,
        borderWidth:0.1,
        borderColor:'#A3A0A1',
        elevation: 1

    },
    footer_likes_lfied:{
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center',
    },
    footer_likes_txt: {

    },
    footer_comments_cfield:{
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center',
    },
    footer_comments_txt:{

    },
    footer_views_rfield:{
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center',
    },
    footer_views_txt:{

    },
});

