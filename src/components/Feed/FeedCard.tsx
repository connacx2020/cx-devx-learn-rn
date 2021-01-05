import { useQuery } from '@apollo/react-hooks';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { getPostRelatedUsersSchema } from '../../common/graphQL';
import { styles } from './styles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MTCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FeedCard: React.FC<{ post: any }> = ({ post }) => {
    const { colors } = useTheme();

    const fetchPostLikes = useQuery(getPostRelatedUsersSchema, { variables: { postID: post.id, option: 'likes' } });
    const fetchPostViews = useQuery(getPostRelatedUsersSchema, { variables: { postID: post.id, option: 'views' } });
    const navigation = useNavigation();

    return (
        <View key={post?.id} style={[styles.container, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={{ borderRadius: 5 }} onPress={() => navigation.navigate("PostDetail", { postData: post, postID: post.id })}>
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

                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        {
                                            post.tags.map((tag: string) => <Text key={tag} style={{ padding: 3, margin: 3, paddingHorizontal: 5, backgroundColor: '#dfdfdf', borderRadius: 4 }}>{tag}</Text>)
                                        }
                                    </View>
                                </View> : null
                        }
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 16, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            {fetchPostLikes.data && fetchPostLikes.data.getPostRelatedUsers.users.length > 0 && <>
                                <AntIcon
                                    name={'like2'}
                                    size={15}
                                    style={{ color: colors.text }}
                                />
                                <Text style={{ marginRight: 10, marginLeft: 3, color: colors.text }}>
                                    {fetchPostLikes.data.getPostRelatedUsers.users.length} like{fetchPostLikes.data.getPostRelatedUsers.users.length > 1 && 's'}
                                </Text>
                            </>}


                            {post.comments.length > 0 &&
                                <><EvilIcons
                                    name={'comment'}
                                    size={20}
                                    style={{ color: colors.text }}
                                />
                                    <Text style={{ color: colors.text }}>
                                        {post.comments.length} comment{post.comments.length > 0 && 's'}
                                    </Text>
                                </>
                            }

                            {fetchPostViews.data && fetchPostViews.data.getPostRelatedUsers.users.length > 0 && <View style={{ flexDirection: 'row' }}>
                                <MTCIcons
                                    name="eye-check-outline"
                                    size={20}
                                    style={{ marginLeft: 10, color: colors.text }}
                                />
                                <Text style={{ marginLeft: 3, color: colors.text }}>
                                    {fetchPostViews.data.getPostRelatedUsers.users.length} view{fetchPostViews.data.getPostRelatedUsers.users.length > 1 && 's'}
                                </Text>
                            </View>}
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FeedCard
