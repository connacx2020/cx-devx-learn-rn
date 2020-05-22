import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        borderRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 1
    },
    content : {

    },
    img: {
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderColor:'#ededed',
        borderWidth:1,
        height:180,
        width:'100%',
        resizeMode: 'stretch'
    },
    title:{
        fontSize:23,
        fontStyle:'italic',
        paddingTop: 5,
        paddingLeft:5
    },
    footer:{
        flex:1,
        flexDirection:'row',
        padding:5
    },
    ratingContainer :{
       flexDirection:'row'
    },
    star:{
        backgroundColor: "#FFD700"
    },
    ratingTxt : {
        marginTop:-2,
        fontStyle:'italic',
        fontSize:18,
        marginHorizontal:20
    },
    likes :{
        flexGrow:1,
        fontStyle:'italic',
        marginTop:-3,
        marginHorizontal:15,
        fontSize:18,
        textAlign:'right'
    }
});
