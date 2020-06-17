import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';


const CxDevxSearchResult: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [searchResult, setSearchedResult] = React.useState();
    useEffect(() => {
        navigation.setOptions({ title: route.params.searchValue });
        setSearchedResult(route.params.searchData)
    }, [route.params.searchValue, searchResult]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={searchResult}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <SearchItemCoverLeft
                        id={item.id}
                        photoUrl={item.photoUrl}
                        title={item.title}
                        rating={item.rating}
                        enrolled={item.enrolled}
                    />
                }
            />
        </View>
    )
}
export default CxDevxSearchResult;
