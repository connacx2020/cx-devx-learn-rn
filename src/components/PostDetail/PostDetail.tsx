import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl, Dimensions } from 'react-native';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import { useTheme } from '@react-navigation/native';
import { getPostByIDSchema, addLikeSchema, removeLikeSchema, isLikedPostSchema } from '../../common/graphQL';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { from } from 'rxjs';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from 'react-redux';
import { CxDevxCommentModal } from '../CommentModalBox';
import { styles } from '../CourseSection/style';
import HTML from 'react-native-render-html';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';


function CxPostDetail(props: any) {
    const { colors } = useTheme();
    let [isLiked, setLike] = useState<Boolean>(false);
    let [isModalVisible, setModalVisible] = useState<Boolean>(false);
    const [addLike] = useMutation(addLikeSchema, { client: graphqlClient });
    const [removeLike] = useMutation(removeLikeSchema, { client: graphqlClient });
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [comments, setComment] = React.useState([]as any);


    const auth: AuthUserInfo = useSelector((state: any) => state.authUserInfo);
    const islikedPost = useQuery(isLikedPostSchema, { variables: { authorID: auth.userID, postID: props.postID }, client: graphqlClient, notifyOnNetworkStatusChange: true })

    const likePressed = () => {
        from(addLike({
            variables: { postID: props.postID, authorID: auth.userID },
            refetchQueries: [
                { query: isLikedPostSchema, variables: { authorID: auth.userID, postID: props.postID } },
                { query: getPostByIDSchema, variables: { postID: props.postID } }
            ]
        }))
            .subscribe(res => {
                setLike(true)
            }, err => {
                ToastAndroid.showWithGravity(
                    "Cannot Like",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            })
    }

    const unlikePressed = () => {
        from(removeLike({
            variables: { postID: props.postID, authorID: auth.userID },
            refetchQueries: [
                { query: isLikedPostSchema, variables: { authorID: auth.userID, postID: props.postID } },
                { query: getPostByIDSchema, variables: { postID: props.postID } }
            ]
        }))
            .subscribe(res => {
                setLike(false)
            }, err => {
                ToastAndroid.showWithGravity(
                    "Cannot UnLike",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            })
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Query<any, any> query={getPostByIDSchema} variables={{ postID: props.postID }}>
                {
                    (fetchPostByID) => {
                        if (fetchPostByID.loading) return <Text>Loading...</Text>
                        if (fetchPostByID.error) return <Text>Error</Text>

                        return <Async promise={getCheckedUserInfo(fetchPostByID.data.searchPostByID.authorID)}>
                            {
                                (getUserInfo) => {
                                    if (getUserInfo.isLoading) return <View><Text>loading</Text></View>
                                    if (getUserInfo.error) return <View><Text>err</Text></View>

                                    return (
                                        <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            {
                                                setComment(fetchPostByID.data.searchPostByID.comments)
                                            }
                                            <ScrollView
                                                refreshControl={
                                                    <RefreshControl
                                                        refreshing={refreshing}
                                                        onRefresh={() => {
                                                            setRefreshing(true)
                                                            fetchPostByID.refetch().then(res => { setRefreshing(false) });
                                                        }}
                                                    />}
                                                style={{ backgroundColor: colors.background }}>
                                                <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.5, paddingBottom: 5, marginTop: 5 }}>

                                                    <Image style={{ width: 60, height: 60, marginHorizontal: 10, borderRadius: 100, }}
                                                        source={{
                                                            uri: getUserInfo.data.photo
                                                        }}
                                                    />

                                                    <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                                                        <Text style={[styles.info_txt, { color: colors.text, fontWeight: 'bold' }]}>{getUserInfo.data.name}</Text>
                                                        <Text style={[styles.info_time, { color: colors.text }]}>{new Date(fetchPostByID.data.searchPostByID.postedOn).toDateString()}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.content}>
                                                    <HTML html={fetchPostByID.data.searchPostByID.content} imagesMaxWidth={Dimensions.get('window').width} />
                                                </View>
                                            </ScrollView>


                                            <Divider />
                                            <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', paddingHorizontal: 10 }}>

                                                    <Text style={{ color: colors.text, alignSelf:'center' }}>{fetchPostByID.data.searchPostByID.likes} Likes</Text>

                                                <EntypoIcon name="dot-single" size={25}/>
                                                <>
                                                    <Text style={{ color: colors.text, alignSelf:'center' }}>{fetchPostByID.data.searchPostByID.comments.length} Comments</Text>
                                                    <EntypoIcon name="dot-single" size={25} />
                                                    <Text style={{ color: colors.text, alignSelf:'center' }}>{fetchPostByID.data.searchPostByID.views}Views</Text>
                                                </>
                                            </View>
                                            <Divider />

                                            <View style={styles.footer}>
                                                <Query<any, any> query={isLikedPostSchema} client={graphqlClient} variables={{ authorID: auth.userID, postID: props.postID }}>
                                                    {
                                                        (checkIsLikedPost) => {
                                                            if (checkIsLikedPost.error) return <Text>Error</Text>
                                                            if (checkIsLikedPost.loading) return <Text>Loading...</Text>

                                                            if (checkIsLikedPost.data) {
                                                                checkIsLikedPost.data.checkUserLikedPost ? setLike(true) : setLike(false)
                                                                return isLiked ? <TouchableOpacity onPress={() => { unlikePressed() }}>
                                                                    <AntIcon
                                                                        name="like1"
                                                                        size={25}
                                                                        color={'blue'}
                                                                    />
                                                                </TouchableOpacity> :
                                                                    <TouchableOpacity onPress={() => { likePressed() }}>
                                                                        <AntIcon
                                                                            name="like2"
                                                                            size={25}
                                                                        />
                                                                    </TouchableOpacity>
                                                            } else {
                                                                return <Text>Something wrong</Text>
                                                            }
                                                        }
                                                    }
                                                </Query>

                                                <TouchableOpacity
                                                    onPress={() => setModalVisible(!isModalVisible)}
                                                >
                                                    <Text style={{ color: colors.text }}>
                                                        <EvilIcons name="comment" size={30} />
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    )
                                }}
                        </Async>

                    }
                }
            </Query>
            <CxDevxCommentModal postID={props.postID} commentInfo={comments} isLiked={isLiked} isModalVisible={isModalVisible} unlikePress={unlikePressed} likePress={likePressed} setModalVisible={setModalVisible} />
        </View>
    )
}

export default CxPostDetail;
