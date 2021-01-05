import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL/graphqlSchema/post.graphqlSchema';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './styles';
import { useTheme } from '@react-navigation/native';
import FeedCard from './FeedCard';

function CxDevXFeed({ navigation, route, selectedTopic }: HomeStackNavProps<"Home">) {
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [filteredTopic, setFilteredTopic] = useState<string>('');
    const [allPosts, setAllPosts] = React.useState([] as any);
    const getRandomPosts = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });

    const { colors } = useTheme();

    React.useEffect(() => {
        setFilteredTopic(selectedTopic);
        if (filteredTopic.length > 0) {
            const filteredPosts = getRandomPosts?.data?.getPostsWithFilters.map((post: any) => {
                if (post?.topics?.topicIDs.includes(filteredTopic)) {
                    return post;
                }
                return null;
            });
            setAllPosts(filteredPosts);
        } else {
            getRandomPosts.data && setAllPosts(getRandomPosts.data.getPostsWithFilters);
        }
    }, [getRandomPosts.data, filteredTopic, selectedTopic]);
    return (
        <ScrollView>
            {
                getRandomPosts.loading && <View style={styles.query_info}><ActivityIndicator size="large" /></View>
            }
            {
                getRandomPosts.error && <View style={styles.query_info}><Text>No Internet Connection!</Text></View>
            }
            {
                allPosts && allPosts.map((post: any) => post?.topics &&
                    <FeedCard key={post.id} post={post} />)
            }
        </ScrollView>
    )
}

export default CxDevXFeed;
