import React from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { LearnStackNavProps } from '../../common/ultis/ParamLists/LearnParamList';
import { useTheme } from '@react-navigation/native';
import CxPostDetail from '../PostDetail/PostDetail';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL/graphqlSchema/post.graphqlSchema';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { getPostSeriesByIdSchema } from '../../common/graphQL';

function CxDevxLearn({ navigation }: LearnStackNavProps<"Learn">) {
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [postSeries, setPostSeries] = React.useState();
    const getRandomPosts = useQuery(getAllPostsSchema, { client: graphqlClient, notifyOnNetworkStatusChange: true });
    const [fetPostSeries, getPostSeries] = useLazyQuery(getPostSeriesByIdSchema, { client: graphqlClient, onError: (error) => console.log("we have error", error), onCompleted: (data) => setPostSeries(data.getPostSeries.posts) })

    React.useEffect(() => {
    }, [getRandomPosts])

    return (
        <ScrollView style={{ flex: 1, padding: 5 }}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={() => { setRefreshing(true); getRandomPosts.refetch().then(res => { setRefreshing(false) }).finally(() => setRefreshing(false)) }}
            />}
        >
            {/* {
                postSeries && <Text>{JSON.stringify(postSeries,null,2)}</Text>
            } */}
            {
                getRandomPosts.loading && <View style={styles.query_info}><ActivityIndicator size="large" /></View>
            }
            {
                getRandomPosts.error && <View style={styles.query_info}><Text>No Internet Connection!</Text></View>
            }
            {
                getRandomPosts.data && getRandomPosts.data.getPosts.map((res: any) =>
                    res.seriesID !== null && <View style={styles.postCard}>
                        <TouchableOpacity onPress={() => { fetPostSeries({ variables: { seriesID: res.seriesID } }); navigation.navigate('CourseSection', { course: res.title, postID: res.id, postSeries }) }}>
                            <CxPostDetail postID={res.id} />
                        </TouchableOpacity>
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    query_info: {
        flex: 1,
        marginTop: Math.round(Dimensions.get("window").height) / 2.8,
        alignItems: 'center'
    },
    postCard: {
        elevation: 5,
        borderWidth: 0.5,
        marginBottom: 10,
        shadowOpacity: 0.25,
        shadowColor: '#333'
    }
});

export default CxDevxLearn;
