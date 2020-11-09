import React from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { LearnStackNavProps } from '../../common/ultis/ParamLists/LearnParamList';
import { useTheme } from '@react-navigation/native';
import CxPostDetail from '../PostDetail/PostDetail';
import { useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL/graphqlSchema/post.graphqlSchema';


function CxDevxLearn({ navigation }: LearnStackNavProps<"Learn">) {
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const getRandomPosts = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });


    React.useEffect(() => {
    }, [getRandomPosts,])

    const reorderPost = (postArray: any[]) => {
        return postArray && postArray.map(res =>
            res.seriesID !== null ?
                <View key={res.id} style={styles.postCard}>
                    <CxPostDetail postID={res.id} key={res.id} />
                </View> : null
            // :
            //     <View key={res.id} style={styles.postCard}>
            //         <Query<any, any> query={getPostSeriesByIdSchema} variables={{ seriesID: res.seriesID }} client={graphqlClient}>
            //             {
            //                 (getSeries) => {

            //                     if (getSeries.loading) return <Text>Loading....</Text>
            //                     // if (getSeries.error) return <Text>Error{JSON.stringify(getSeries.error)}</Text>
            //                     if (getSeries.error) return <Text>Error</Text>

            //                     if (getSeries.data) {
            //                         return <TouchableOpacity onPress={() => {
            //                             navigation.navigate('CourseSection', { course: res.title, postID: res.id, postSeries: getSeries.data.getPostSeries.posts })
            //                         }}>
            //                             <CxPostDetail postID={res.id} />
            //                         </TouchableOpacity>
            //                     } else {
            //                         return <Text>Error</Text>
            //                     }
            //                 }
            //             }

            //         </Query>
            //     </View>

        )
    }

    return (
        <ScrollView style={{ flex: 1, padding: 5 }}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={() => { setRefreshing(true); getRandomPosts.refetch().then(res => { setRefreshing(false) }).finally(() => setRefreshing(false)) }}
            />}
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

const styles = StyleSheet.create({

    query_info: {
        flex: 1,
        marginTop: Math.round(Dimensions.get("window").height) / 2.5,
        alignItems: 'center'
    },
    postCard: {
        elevation: 5,
        borderWidth: 0.3,
        marginBottom: 10,
        shadowOpacity: 0.25,
        shadowColor: '#333'
    }
});

export default CxDevxLearn;
