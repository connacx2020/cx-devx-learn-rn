import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Modal,
    Alert
} from 'react-native';
import CxPostDetail from '../PostDetail/PostDetail';
import { useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL/graphqlSchema/post.graphqlSchema';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './styles';

function CxDevXFeed({ navigation, route, selectedTopic }: HomeStackNavProps<"Home">) {
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [filteredTopic, setFilteredTopic] = useState<string>('');
    const [allPosts, setAllPosts] = React.useState([]);
    const getRandomPosts = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });

    React.useEffect(() => {
        getRandomPosts?.data?.getPostsWithFilters && setAllPosts(getRandomPosts?.data?.getPostsWithFilters);
    }, [getRandomPosts.data]);

    const reorderPost = (postArray: any[]) => {
        return postArray && postArray.map(res =>
            res.seriesID &&
                filteredTopic.length > 0 ?
                res.topics.topicIDs.include(filteredTopic) &&
                <CxPostDetail postID={res.id} key={res.id} postData={res} /> :
                <CxPostDetail postID={res.id} key={res.id} postData={res} />
        );
    };

    return (
        <ScrollView
        // refreshControl={<RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => { setRefreshing(true); getRandomPosts.refetch().then(res => { setRefreshing(false) }).finally(() => setRefreshing(false)) }}
        // />}
        >
            {
                getRandomPosts.loading && <View style={styles.query_info}><ActivityIndicator size="large" /></View>
            }
            {
                getRandomPosts.error && <View style={styles.query_info}><Text>No Internet Connection!</Text></View>
            }
            {
                getRandomPosts.data && reorderPost(getRandomPosts.data.getPostsWithFilters)
            }
        </ScrollView>
    )
}

export default CxDevXFeed;
