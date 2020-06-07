import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 200,
        position: 'relative',
        flexDirection: 'row',
        elevation:3,
        padding:10
    },
    header_left: {
        flexGrow: 2,
    },
    back_arrow: {
        top: '5%',
        left: '1%',
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    avator_container: {
        left: '20%',
        top: '20%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    header_right: {
        // marginTop:30,
        flexGrow: 5,
        flexDirection: 'column',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
    },
    user_name:{
        fontSize:23,
        fontWeight:'200',
        color:'#fff'
    },
    user_email:{
        fontSize:15,
        fontStyle:'italic',
        color:'#fff'
    },
    devx_view_field: {
        flexDirection: 'row',
        marginTop:20,
    },
    devx_view_btn:{
        marginHorizontal:5,
        padding:10,
        borderRadius:5,
        backgroundColor:'#2289f0'
    },
    devx_view_btn_txt:{
        fontWeight:'300'
    },
    body:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around'
    }
});
