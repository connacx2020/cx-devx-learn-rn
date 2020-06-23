import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        flex:1,
        backgroundColor:'#fff',
    },
    centerTxt:{
        marginHorizontal:15,
        paddingLeft:5,
        marginVertical: 8,
        alignItems:'center',
        fontSize:17,
        fontStyle:"italic",
        fontWeight: 'bold'
    },
    query_info: {
        flex: 1,
        marginTop: Math.round(Dimensions.get("window").height) / 2.5,
        alignItems: 'center'
    },
})
