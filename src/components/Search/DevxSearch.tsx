import React ,{ useState } from 'react';
import {View,Text,FlatList,Button} from 'react-native';
import { Searchbar,List  } from 'react-native-paper';  
import * as Animatable from 'react-native-animatable'  
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const DevxSearch: React.FC= () =>{
    const listItems = ['GraphQL', 'RxJS', 'Nestjs', 'Nextjs', 'Reactjs', 'React Native', 'Neo4j', 'Microservices',"Angular","Typescript","React-Navigation-v5"]
    const [tempData,setTempData] = useState(listItems);
    let [data,sethData] = useState(listItems);
    const [searchText,setSearchText] = useState<String>('');
    const navigation = useNavigation();

    const renderHeader = () => {
         return  
     };
     const updateSearch =(value:string) =>{
        setSearchText(value);
        let data = tempData.filter(function(item){
            return item.includes(value);
        }).map((item)=>{
            return item
        });
        sethData(data)

     }
     console.log(data);
    return(
        <View>
            <Searchbar
                placeholder="Search Here ..."
                onChangeText={(value)=>updateSearch(value) }
                value={searchText}
             />
            <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={({ item }) => 
                (
                <TouchableOpacity onPress={()=>navigation.navigate('SearchResult',{searchValue:'GraphQL'})}>
                    <List.Item
                        title={item}
                    />
                 </TouchableOpacity>
                 )
            }
            />
        </View>
    )
}
export default DevxSearch;