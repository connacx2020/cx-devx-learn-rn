import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import {
    getPostByIDSchema,
    addLikeSchema,
    removeLikeSchema,
    isPostLikedSchema,
    getPostRelatedUsersSchema
} from '../../common/graphQL';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation, useTheme } from '@react-navigation/native';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { from } from 'rxjs';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from 'react-redux';
import { CxDevxCommentModal } from '../CommentModalBox';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import { styles } from './styles';

function CxPostDetail(props: any) {
    const { colors } = useTheme();
    const { postData } = props.postData ? props : props.route.params;
    const navigation = useNavigation();

    let [isModalVisible, setModalVisible] = useState<Boolean>(false);
    let [isLiked, setLike] = useState<boolean>(false);
    const [likes, setLikes] = useState([] as any);
    const [views, setViews] = useState([] as any);
    const [comments, setComment] = useState([] as any);
    const [addLike] = useMutation(addLikeSchema, { client: graphqlClient });
    const [removeLike] = useMutation(removeLikeSchema, { client: graphqlClient });
    const fetchPostLikes = useQuery(getPostRelatedUsersSchema, { variables: { postID: props.postID, option: 'likes' } });
    const fetchPostViews = useQuery(getPostRelatedUsersSchema, { variables: { postID: props.postID, option: 'views' } });
    const auth: AuthUserInfo = useSelector((state: any) => state.authUserInfo);
    const isPostLikedQuery = useQuery(isPostLikedSchema, { variables: { authorID: auth.userID, postID: props.postID }, client: graphqlClient, notifyOnNetworkStatusChange: true })
    const getPostByIDQuery = useQuery(getPostByIDSchema, { variables: { postID: postData.id }, client: graphqlClient, notifyOnNetworkStatusChange: true });
    const handleLikeButton = () => {
        isLiked ? from(removeLike({
            variables: { postID: props.postID, userID: auth.userID },
            refetchQueries: [
                { query: getPostRelatedUsersSchema, variables: { postID: props.postID, option: 'likes' } },
                { query: isPostLikedSchema, variables: { postID: props.postID, authorID: auth.userID } },
            ]
        }))
            .subscribe(res => {
                setLike(false);
                fetchPostLikes.refetch();
            }, err => {
                ToastAndroid.showWithGravity(
                    "Cannot UnLike",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            }) : from(addLike({
                variables: { postID: props.postID, userID: auth.userID },
                refetchQueries: [
                    { query: getPostRelatedUsersSchema, variables: { postID: props.postID, option: 'likes' } },
                    { query: isPostLikedSchema, variables: { postID: props.postID, authorID: auth.userID } },
                ]
            }))
                .subscribe(res => {
                    setLike(true)
                    fetchPostLikes.refetch();
                }, err => {
                    ToastAndroid.showWithGravity(
                        "Cannot Like",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                });
    }

    useEffect(() => {
        props?.route?.params && navigation.setOptions({ id: postData.id, title: postData.title });
        isPostLikedQuery?.data?.isPostLikedByUser ? setLike(true) : setLike(false);
        getPostByIDQuery?.data?.searchPostByID && setComment(getPostByIDQuery?.data?.searchPostByID.comments);
        fetchPostLikes?.data?.getPostRelatedUsers && setLikes(fetchPostLikes?.data?.getPostRelatedUsers.users);
        fetchPostViews?.data?.getPostRelatedUsers && setViews(fetchPostViews?.data?.getPostRelatedUsers.users);
    }, [isPostLikedQuery.data, getPostByIDQuery.data, fetchPostViews.data, fetchPostLikes.data]);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.card }]}>

            <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <View
                    style={{ backgroundColor: colors.card }}>
                    <View style={{ flexDirection: 'row', borderBottomColor: colors.border, borderBottomWidth: 0.5, paddingBottom: 5, marginTop: 5 }}>

                        <Image style={{ width: 60, height: 60, marginHorizontal: 10, borderRadius: 100, }}
                            source={{
                                uri: postData.author.photo
                            }}
                        />

                        <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                            <Text style={[styles.info_txt, { color: colors.text, fontWeight: 'bold' }]}>{postData.author.name}</Text>
                            <Text style={[styles.info_time, { color: colors.text }]}>{new Date(postData.postedOn).toDateString()}</Text>
                        </View>

                    </View>

                    <View style={styles.content}>
                        {/* <HTML html={fetchPostByID.data.searchPostByID.content} imagesMaxWidth={Dimensions.get('window').width} /> */}
                        {
                            postData.title.length > 0 ?
                                <View style={styles.titleContainer}>
                                    <Text style={[styles.titleText, { color: colors.text }]}>
                                        {postData.title}
                                    </Text>
                                </View> : null
                        }
                        <Text>Topics: {postData.topics?.topicIDs}</Text>
                        <Markdown style={{
                            body: { color: colors.text },
                            hr: { backgroundColor: colors.background },
                            blockquote: { backgroundColor: colors.background },
                            code_inline: {
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                            },
                            code_block: {
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                            },
                            fence: {
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                            },
                            table: {
                                borderColor: colors.border,
                            },
                            tr: {
                                borderColor: colors.border
                            },
                            blockLink: {
                                borderColor: colors.border
                            },
                        }}>
                            {postData.content}
                        </Markdown>
                    </View>
                </View>


                <Divider />
                <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', paddingHorizontal: 16 }}>
                    <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 12 }}>{likes.length} like{likes.length > 1 && 's'} </Text>
                    <EntypoIcon name="dot-single" size={25} color={colors.text} />
                    <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 12 }}>{comments.length} Comment{comments.length > 1 && 's'}</Text>
                    <EntypoIcon name="dot-single" size={25} color={colors.text} />
                    <Text style={{ color: colors.text, alignSelf: 'center', fontSize: 12 }}>{views.length} View{views.length > 1 && 's'}</Text>
                </View>
                <Divider />

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleLikeButton}>
                        <AntIcon
                            name={isLiked ? 'like1' : 'like2'}
                            size={25}
                            color={isLiked ? colors.primary : colors.text}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!isModalVisible)}
                    >
                        <Text style={{ color: colors.text }}>
                            <EvilIcons name="comment" size={30} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CxDevxCommentModal postID={postData.id} commentInfo={comments} isLiked={isLiked} isModalVisible={isModalVisible} unlikePress={handleLikeButton} likePress={handleLikeButton} setModalVisible={setModalVisible} />
        </ScrollView>
    )
}

export default CxPostDetail;
