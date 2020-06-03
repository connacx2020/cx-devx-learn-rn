import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        height:200,
        flexGrow:3,
        position:"relative",
        justifyContent:'center',
        alignItems:'center',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1
    },
    header_course_img:{
        width:'100%',
        height:'100%',
        resizeMode: 'stretch',
        opacity:0.5
    },
    header_left_arrow:{
        top:"5%",
        left:"1%",
        alignSelf:'flex-start',
        position:"absolute",
    },
    header_title:{
        top:"25%",
        position:"absolute",
        textAlign:'center',
        fontSize:25,
        color:'#000',
        fontStyle:"italic",
        fontWeight:'bold',
    },
    header_btn:{
        top:"65%",
        position:"absolute",
        backgroundColor:'#2541B2',
        paddingVertical:12,
        paddingHorizontal:24,
        borderRadius:10,
        textAlign:'center'
    },
    header_btn_txt:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        color:'white'
    },
    footer_tabs:{
        flexGrow:7,
    },

})
