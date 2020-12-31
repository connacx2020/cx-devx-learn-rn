import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    container:{
        flex:1,
        justifyContent:'space-between',
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
});

