import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
some:{

},
card: {
    borderRadius:5,
    elevation:3,
    backgroundColor : '#fff',
    shadowOffset:{width: 2, height: 1},
    shadowColor: '#333',
    shadowOpacity:0.4,
    shadowRadius:5,
    marginHorizontal:20,
    marginVertical:10,
    height:300
},
card_header:{
    flex:1.8,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft:7,
    elevation:0.5,
    shadowOffset:{width: 2, height: 1},
    shadowColor: '#3c434d',
    shadowOpacity:0.5,
    shadowRadius:3,
},
header_img:{
    width:50,
    height:50,
    borderRadius:50,
    backgroundColor:'white'
},
header_txt:{
    marginHorizontal: 15
},
head_post_txt:{
    fontSize: 20,
    fontWeight:'bold',
},
header_time_txt:{
    fontStyle:'italic',
    color:'gray'
},
card_content:{
    flex:5,
    justifyContent:'center',
},
card_content_img:{
    flex:1
},
card_footer:{
    flex:1.4,
    flexDirection:'row',
    elevation:0.5,
    shadowOffset:{width: 2, height: 1},
    shadowColor: '#3c434d',
    shadowOpacity:0.5,
    shadowRadius:3,

},
like:{
    flexGrow:1,
    fontSize:17,
    fontStyle:'italic',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginHorizontal:30
},
comment:{
    flexGrow:1,
    fontSize:17,
    fontStyle:'italic',
    alignSelf:'center',
    padding:10
},
view:{
    flexGrow:1,
    fontSize:17,
    fontStyle:'italic',
    alignSelf:'center',
    padding:10
},
icon:{
    alignItems:'center'

}

});
