import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    body:{
        flex:1,
        flexDirection:'row',
        marginVertical:5
    },
    topic_card:{
        // flex:1,
        margin:10,
        flexDirection:'column',
        backgroundColor:'white',
        elevation:3,
        borderRadius:5
    },
    topic_card_header:{
        height:100,
        flexGrow:3,
        position:"relative",
        justifyContent:'center',
        alignItems:'center',
    },
    img:{
        width:80,
        height:80,
        resizeMode: 'stretch',
    },
    heard_icon:{
        marginVertical:5,
       justifyContent:'center',
       alignItems:'center',
       borderWidth:1,
       borderRadius:10,
       borderColor:'#7C7879',
       padding:6
    },
    topic_card_footer:{
        top:-10,
        justifyContent:'center',
        alignItems:'center',
    },
    topic_card_title_txt:{
        fontSize:17,
        fontWeight:'bold'
    },
    topic_card_desc_txt:{
        fontStyle:'italic',
        fontSize:13,
        padding:3,
        textAlign:'center'
    }

})
