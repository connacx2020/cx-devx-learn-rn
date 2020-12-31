import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import CxPostDetail from '../PostDetail/PostDetail';
import { useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL/graphqlSchema/post.graphqlSchema';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import DevxSearch from '../Search/DevxSearch';


function CxDevXFeed({ navigation, isShowSearch, route }: HomeStackNavProps<"Home">) {
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [allPosts, setAllPosts] = React.useState([]);
    const getRandomPosts = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });

    React.useEffect(() => {
        getRandomPosts?.data?.getPostsWithFilters && setAllPosts(getRandomPosts?.data?.getPostsWithFilters);
    }, [getRandomPosts.data])

    const reorderPost = (postArray: any[]) => {
        return postArray && postArray.map(res =>
            res.seriesID !== null ?
                <CxPostDetail postID={res.id} key={res.id} postData={res} />
                : null
        )
    }

    return (
        !isShowSearch ?
            <ScrollView style={{ flex: 1, }}
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
            </ScrollView> :
            <DevxSearch />
    )
}

const styles = StyleSheet.create({

    query_info: {
        flex: 1,
        marginTop: Math.round(Dimensions.get("window").height) / 2.5,
        alignItems: 'center'
    },
    postCard: {
        elevation: 5,
        borderRadius: 8,
        marginBottom: 10,
        shadowOpacity: 0.25,
    }
});

export default CxDevXFeed;
