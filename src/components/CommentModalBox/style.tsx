import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modal:{
        flex:1,
        backgroundColor:'white',
        borderRadius:15

    },
    modal_header:{
        height:40,
        flexDirection:'row',
        padding:5,
        elevation: 0.5

    },
    modal_header_back_left:{
        flexGrow:1,
        marginHorizontal:3,
    },
    modal_header_likes_right:{
        flexGrow:1,
        alignItems:'flex-end',
        marginHorizontal:5,
    },
    modal_content:{
        flexGrow:1,
        marginHorizontal:10,
        marginVertical:10,
    },
    modal_comment_container:{
        marginVertical:10,
        flex:1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
        borderWidth:0.1,
        borderColor:'#A3A0A1',
        borderRadius:10,

    },
    modal_comment_hader:{
        flexGrow:1,
        height:50,
        flexDirection:'row',
        // borderBottomWidth:1
    },
    modal_comment_header_avatar_lfield:{
        justifyContent:'center',
        alignItems:'flex-start',
        flexGrow:1,
        paddingLeft:10
    },
    modal_avatar:{
        width:'75%',
        height:"80%",
        borderRadius:100
    },
    modal_comment_header_userInfo_rfield:{
        marginVertical:5,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexGrow:4,
        flexDirection:'column'
    },
    modal_user_info_txt:{
        fontSize:17,
        fontWeight:'bold'
    },
    modal_comment_time_txt:{
        fontStyle:'italic'
    },
    modal_comment_content:{
        minHeight:30,
        marginVertical:5,
        marginLeft:50
    },
    modal_comment_content_txt:{
        fontSize:17

    },
    modal_footer:{
        borderTopWidth:1,
        height:60,
        alignItems:'center',
        justifyContent:'center',

    },
    modal_comment_txtinput:{
        width:'90%',
        paddingLeft:20,
        backgroundColor:'#E0EAEB',
        borderRadius:10,
        fontSize:18
    }
})
