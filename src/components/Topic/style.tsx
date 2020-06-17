import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    body:{
        flex:1,
        flexDirection:'row',
        marginVertical:5
    },
    topic_card:{
        height:150,
        width:150,
        flex:1,
        margin:15,
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
        top:"10%",
        position:'absolute',
        width:80,
        height:80,
        resizeMode: 'stretch',
    },
    heard_icon:{
        top:"4%",
        left:"10%",
        alignSelf:'flex-start',
        position:"absolute",
        elevation:2
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