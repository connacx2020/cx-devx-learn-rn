import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    user_overview:{
        marginVertical:10,
        marginHorizontal:20

    },
    instructor_text:{
        fontSize:30,
        fontWeight:'bold',
        padding:5
    },
    user_container:{
        flexDirection:'row',
    },
    user_avatar_field:{
        flexGrow:1,
        marginHorizontal:15
    },
    user_avatar:{
        width:80,
        height:80,
        borderRadius:50
    },
    user_name_email_field:{
        flexGrow:3,
        fontWeight:'bold'
    },
    user_name_txt:{
        padding:5,
        fontSize:20,
        fontWeight:'bold'
    },
    user_email_txt:{
        padding:5,
        fontSize:20,
        fontWeight:'bold'
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
        borderRadius: 4,
        elevation: 2
    },
    rate_enroll_like_field:{
        marginHorizontal:5,
        marginVertical:5,
        flexDirection:'row',
    },
    rating_field:{
        marginHorizontal:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
    },
    rating_star:{
        marginLeft:5,
    },
    rating_txt:{
        padding:10,
        fontSize:19,
        fontStyle:'italic'
    },
    enroll_like_field:{
        paddingHorizontal:5,
        marginHorizontal:5,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
    },
    course_duration_field:{
        paddingHorizontal:15,
        marginVertical:10,
        marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10
    },
    course_duration_txt:{
        paddingHorizontal:10,
        marginHorizontal:10,
        fontSize:21,
        fontStyle:'italic',
        padding:10
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
        borderRadius: 4,
        elevation: 2

    },
    content_title:{
        fontSize:30,
        fontWeight:'bold',
        padding:10

    },
    content_description:{
        padding:10,
        fontSize:20

    }
})
