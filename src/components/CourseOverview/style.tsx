import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    user_overview:{
        padding:15,
        marginHorizontal:20,
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 1,
        elevation: 3,
        backgroundColor:'#fff',
    },
    user_container:{
        flexDirection:'row',
        marginHorizontal:10,
    },
    user_avatar_field:{
        flexGrow:1,
    },
    user_avatar:{
        width:60,
        height:60,
        borderRadius:50
    },
    user_name_email_field:{
        flexGrow:3,
        fontWeight:'bold',
        alignItems:'center'
    },
    user_name_txt:{
        marginRight:15,
        fontSize:14,
        fontWeight:'bold'
    },
    feedback_overview:{
        padding:15,
        flexDirection:'column',
        marginHorizontal:20,
        marginVertical:20,
        justifyContent:'center',
        backgroundColor:'#fff',
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 1,
        elevation: 3
    },
    course_info_text:{
        paddingHorizontal:5,
        fontSize:18,
        fontWeight:'300',
        textAlign:'left'

    },
    cinfo_row:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    cinfo_title:{
        fontSize:15
    },
    cinfo_value_txt:{
        fontSize:14
    },
    rating_field:{
      
    },
    star:{
        color: "#FFD700"
    },
    desc_field:{
        paddingHorizontal:10,
        paddingVertical:5
    },
    desc_txt:{
        fontSize:15
    },
    desc_info_txt:{
        textAlign: 'left',
        fontSize:13,
        paddingVertical:4
    },
    show_more_less_txt:{
        fontSize:12,
        color:'#333',
        paddingHorizontal:2,
        fontStyle:'italic'
    },
    content_overiew:{
        padding:15,
        flexDirection:'column',
        marginHorizontal:20,
        marginVertical:15,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 1,
        elevation: 3,
        backgroundColor:'#fff',

    },
    content_title:{
        fontSize:17,
        fontWeight:'bold',
        paddingVertical:7

    },
    content_description:{
        fontSize:14,
        textAlign:'left',
        padding:5

    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
})
