import React, { useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Card, Title, Paragraph } from 'react-native-paper';

import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';


const CxDevxSearchResult: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    useEffect(() => {
        navigation.setOptions({ title: route.params.searchValue })
    }, [route.params.searchValue]);
    const courseData = [
        {
            img: "https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg",
            title: "GraphQL Advanced Course",
            rate: 4.5,
            likes: 1000,
            enrolled: 531,
        },
        {
            img: "https://miro.medium.com/max/2880/1*xcDT-neKHP7E3quS9n30gw.png",
            title: "React Hooks Course",
            rate: 5,
            likes: 1500,
            enrolled: 321
        },
        {
            img: "https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png",
            title: "Nodejs Advanced Course",
            rate: 4,
            likes: 784,
            enrolled: 212
        },
        {
            img: "https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg",
            title: "React Native With Typescript",
            rate: 4,
            likes: 1000,
            enrolled: 651,
        },
        {
            img: "https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png",
            title: "GraphQL with Neo4j  Course",
            rate: 5,
            likes: 1000,
            enrolled: 531,
        }

    ];
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={courseData}
                keyExtractor={item => item.title}
                renderItem={({ item, index }) => {
                    return (
                        <SearchItemCoverLeft
                            img={item.img}
                            title={item.title}
                            rate={item.rate}
                            likes={item.likes}
                            enrolled={item.enrolled}
                        />
                    )
                }}
            />
        </View>
    )
}
export default CxDevxSearchResult;
