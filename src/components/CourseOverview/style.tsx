import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    user_overview:{
        padding:10,
        marginVertical:10,
        marginHorizontal:20,
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 1,
        elevation: 1

    },
    instructor_text:{
        fontSize:18,
        fontWeight:'bold',
        padding:5
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
        fontWeight:'bold'
    },
    user_name_txt:{
        padding:5,
        fontSize:14,
        fontWeight:'bold'
    },
    user_email_txt:{
        padding:5,
        fontSize:15,
        fontWeight:'bold'
    },
    user_about_txt:{
        fontSize:13,
        fontStyle:"italic",
        textAlign:'center'
    },
    feedback_overview:{
        padding:10,
        flexDirection:'column',
        marginHorizontal:20,
        marginVertical:10,
        justifyContent:'center',
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 1,
        elevation: 1
    },
    rate_enroll_like_field:{
        justifyContent:'space-around',
        marginHorizontal:5,
        marginVertical:5,
        flexDirection:'row',
    },
    rating_star:{
        marginLeft:5,
    },
    rating_txt:{
        padding:5,
        fontSize:16,
        fontStyle:'italic'
    },
    enroll_like_field:{
        paddingHorizontal:10,
        marginHorizontal:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderWidth:1,
        borderRadius:20,
    },
    course_duration_field:{
        paddingHorizontal:5,
        marginVertical:10,
        marginHorizontal:15,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:20
    },
    course_duration_txt:{
        paddingHorizontal:10,
        marginHorizontal:10,
        fontSize:16,
        fontStyle:'italic',
        padding:6
    },
    rating_field:{
        marginVertical:5,
        marginHorizontal:40,
        // flexDirection:'row',
        // alignItems:'center',
    },
    star:{
        color: "#FFD700"
    },
    content_overiew:{
        padding:15,
        flexDirection:'column',
        marginHorizontal:20,
        marginVertical:10,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 2,
        elevation: 1

    },
    content_title:{
        fontSize:18,
        fontWeight:'bold',
        padding:10

    },
    content_description:{
        padding:5,
        fontSize:14

    }
})
