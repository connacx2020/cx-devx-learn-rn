import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar, List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/react-hooks';
import { searchCourseByTitle } from '../../common/graphQL';

const DevxSearch: React.FC = () => {
    const [searchedResultData, setSearchedData] = useState([]);
    const [fetchSearch, searchResult] = useLazyQuery(searchCourseByTitle, { variables: { courseTitle: '' }, onCompleted: data => { setSearchedData(data.findCourseByTitle.map((res: any) => res)) } });
    const [searchText, setSearchText] = useState<string>('');
    const navigation = useNavigation();


    const updateSearch = (value: string) => {
        fetchSearch({ variables: { courseTitle: value } })
        setSearchText(value);
        if (searchResult.data) {
            // console.log(searchResult.data)
            // let result = searchResult.data.findCourseWithTitle.map((res: any)=>res.title)
            // console.log(result)
            // setSearchedData(result)

            // searchedData.filter((item: any) => {
            //     return item.includes(value);
            // }).map((item) => {
            //     return item
            // });
            // setSearchedData(searchedData);
        }
        else {
            console.log(searchResult.error)
        }


    }

    return (
        <View>
            <Searchbar
                testID="searchInput"
                placeholder="Search Here ..."
                onChangeText={(value) => updateSearch(value)}
                value={searchText}
            />
            <FlatList
                testID="searchArrayList"
                data={searchedResultData}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) =>
                    (
                        <TouchableOpacity onPress={() => navigation.navigate('SearchResult', { searchValue: item.title, searchData: searchedResultData })}>
                            <List.Item
                                title={item.title}
                            />
                        </TouchableOpacity>
                    )
                }
            />
        </View>
    )
}
export default DevxSearch;
