import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    container:{
        flex:1,
        justifyContent:'space-between',
        backgroundColor:'#000',
    },
    header:{
        // flexGrow:1,
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
        backgroundColor:'#333',
        width:'65%',
        height:50,
        borderRadius:100
    },
    header_info_rfield:{
        marginVertical:13,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexGrow:4,
        flexDirection:'column'
    },
    info_txt:{
        fontSize:17,
        fontStyle:'italic'
    },
    info_time:{
        fontSize:13,
    },
    content:{
        marginHorizontal:10,
        flex:1,
        flexDirection: 'column',
        padding:5,
        paddingVertical:10
    },
    content_title:{
        fontWeight:'bold',
        fontSize:20
    },
    content_title_txt:{
        fontWeight:'bold',
        fontSize:16,
        paddingVertical:10
    },
    content_txt:{
        padding:5,
        fontSize:15
    },
    footer:{
        flexDirection:'row',
        height:50,
        borderWidth:0.1,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

