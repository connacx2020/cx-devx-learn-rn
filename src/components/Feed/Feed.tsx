import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native';
import CxPostDetail from '../PostDetail/PostDetail';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema, getPostRelatedUsersSchema } from '../../common/graphQL/graphqlSchema/post.graphqlSchema';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './styles';
import { useTheme } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';

function CxDevXFeed({ navigation, route, selectedTopic }: HomeStackNavProps<"Home">) {
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [filteredTopic, setFilteredTopic] = useState<string>('');
    const [allPosts, setAllPosts] = React.useState([] as any);
    const getRandomPosts = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });
    const [likes, setLikes] = useState(0);
    const [postLikes, resultPostLikes] = useLazyQuery(getPostRelatedUsersSchema, { variables: { postID: '', option: 'likes' }, onCompleted: data => { setLikes(data.getPostRelatedUsers.users.length) } });
    const { colors } = useTheme();

    const renderPost = (id: string) => {
        postLikes({ variables: { postID: id, option: 'likes' } });
        return <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 12 }}>{likes} like{likes > 1 && 's'} </Text>;
    }

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
                    <View style={[styles.container, { backgroundColor: colors.card }]}>
                        <TouchableOpacity style={{ borderRadius: 5 }}>
                            <View
                                style={{ backgroundColor: colors.card }}>
                                <View style={{ flexDirection: 'row', borderBottomColor: colors.border, borderBottomWidth: 0.5, paddingBottom: 5, marginTop: 5 }}>

                                    <Image style={{ width: 60, height: 60, marginHorizontal: 10, borderRadius: 100, }}
                                        source={{
                                            uri: post.author.photo
                                        }}
                                    />

                                    <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                                        <Text style={[styles.info_txt, { color: colors.text, fontWeight: 'bold' }]}>{post.author.name}</Text>
                                        <Text style={[styles.info_time, { color: colors.text }]}>{new Date(post.postedOn).toDateString()}</Text>
                                    </View>

                                </View>

                                <View style={styles.content}>
                                    {
                                        post.title.length > 0 ?
                                            <View style={styles.titleContainer}>
                                                <Text style={[styles.titleText, { color: colors.text }]}>
                                                    {post.title}
                                                </Text>
                                                <Text>{post.tags}</Text>
                                            </View> : null
                                    }
                                </View>
                                <Divider accessibilityStates='' />
                                <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', paddingHorizontal: 16 }}>
                                    {renderPost(post.id)}
                                    <EntypoIcon name="dot-single" size={25} color={colors.text} />
                                    {/* <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 12 }}>{comments.length} Comment{comments.length > 1 && 's'}</Text>
                                    <EntypoIcon name="dot-single" size={25} color={colors.text} />
                                    <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 12 }}>{views.length} View{views.length > 1 && 's'}</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default CxDevXFeed;
