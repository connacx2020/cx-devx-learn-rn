import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  },
  header:{
    marginVertical:10,
    marginHorizontal:10,
    position:'relative',
  },
  header_feel:{
    marginTop:10,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    alignItems:'center'
  },
  popup_menus:{
    right:"-5%",
    alignSelf:'flex-end',
    position:"absolute",
    elevation:0.4,
    padding:2
  },
  body:{
      flex:1,
      elevation:1,
    //   backgroundColor:'red'
  }
});
