import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/react-hooks';
import { searchCourseByTitle, searchPostsByTextSchema, searchTopicsByTextSchema } from '../../common/graphQL';
import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';

const DevxSearch: React.FC = (props: any) => {
    const { searchFor } = props.route.params;
    const [searchedResultData, setSearchedData] = useState([]);
    const [searchCourses, resultCourses] = useLazyQuery(searchCourseByTitle, { variables: { courseTitle: '' }, onCompleted: data => { setSearchedData(data.findCourseByTitle.map((res: any) => res)) } });
    const [searchTopics, resultTopics] = useLazyQuery(searchTopicsByTextSchema, { variables: { text: '' }, onCompleted: data => { setSearchedData(data.searchTopicsByText.map((res: any) => res)) } });
    const [searchPosts, resultPosts] = useLazyQuery(searchPostsByTextSchema, { variables: { text: '' }, onCompleted: data => { setSearchedData(data.searchPostsByText.map((res: any) => res)) } });

    const [searchText, setSearchText] = useState<string>('');
    const navigation = useNavigation();

    const updateSearch = (value: string) => {
        setSearchText(value);
        const cases: any = {
            'post': () => {
                searchPosts({ variables: { text: value } });
            },
            'course': () => {
                searchCourses({ variables: { courseTitle: value } });
            },
            'topic': () => {
                searchTopics({ variables: { text: value } });
            }
        }
        if (cases[searchFor]) {
            cases[searchFor]();
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
                    <SearchItemCoverLeft
                        searchFor={searchFor}
                        searchResult={item}
                    />
                    // <TouchableOpacity onPress={() => navigation.navigate('SearchResult', { searchValue: item.title, searchData: searchedResultData })}>
                    //     <List.Item
                    //         title={item.title}
                    //     />
                    // </TouchableOpacity>
                }
            />
        </View>
    )
}
export default DevxSearch;
