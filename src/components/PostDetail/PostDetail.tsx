import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Query } from '@apollo/react-components';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import { useTheme } from '@react-navigation/native';
import { getPostByIDSchema, addLikeSchema, removeLikeSchema, addCommentSchema, getLikedUserSchema } from '../../common/graphQL';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { from } from 'rxjs';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from 'react-redux';
import { CxDevxCommentModal } from '../CommentModalBox';
import { styles } from '../CourseSection/style';


function CxPostDetail(props: any) {
    const { colors } = useTheme();
    let [isLiked, setLike] = useState<Boolean>(true);
    let [isModalVisible, setModalVisible] = useState<Boolean>(false);
    const [addLike] = useMutation(addLikeSchema, { client: graphqlClient });
    const [removeLike] = useMutation(removeLikeSchema, { client: graphqlClient });
    const [refreshing, setRefreshing] = React.useState<boolean>(false);


    const auth: AuthUserInfo = useSelector((state: any) => state.authUserInfo);

    const likePressed = () => {
        // if (!isLiked) {
        from(addLike({ variables: { postID: props.postID, authorID: auth.userID } }))
            .subscribe(res => {
                // if (res.data.addLike) {
                setLike(true)
                ToastAndroid.showWithGravity(
                    "Like",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                // }
            }, err => {
                ToastAndroid.showWithGravity(
                    "Cannot Like",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            })
        // }
    }

    const unlikePressed = () => {
        if (isLiked) {
            from(removeLike({ variables: { postID: props.postID, authorID: auth.userID } }))
                .subscribe(res => {
                    setLike(false)
                    ToastAndroid.showWithGravity(
                        "UnLike",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                }, err => {
                    ToastAndroid.showWithGravity(
                        "Cannot UnLike",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                })
        }
    }



    React.useEffect(() => {
    }, [isLiked])

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
                                                <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.5, paddingBottom: 5, marginTop:5 }}>

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
                                                    <Text style={[styles.info_time, { color: colors.text }]}>{fetchPostByID.data.searchPostByID.content}</Text>
                                                </View>
                                            </ScrollView>

                                            <View style={styles.footer}>
                                                {
                                                    isLiked ?
                                                        <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => { likePressed(); fetchPostByID.refetch() }}>
                                                            <Text style={{ color: colors.text }}>{fetchPostByID.data.searchPostByID.likes} Likes</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={() => { unlikePressed(); fetchPostByID.refetch() }}>
                                                            <Text style={{ color: colors.text }}>{fetchPostByID.data.searchPostByID.likes} unLikes</Text>
                                                        </TouchableOpacity>
                                                }


                                                <TouchableOpacity
                                                    onPress={() => setModalVisible(!isModalVisible)}
                                                >
                                                    <Text style={{ color: colors.text }}>Comments</Text>
                                                </TouchableOpacity>

                                                <View >
                                                    <Text style={{ color: colors.text }}>{fetchPostByID.data.searchPostByID.views}Views</Text>
                                                </View>
                                                <CxDevxCommentModal postID={props.postID} commentInfo={fetchPostByID.data.searchPostByID.comments}  isLiked={isLiked} isModalVisible={isModalVisible} setLike={isLiked} setModalVisible={setModalVisible} />
                                            </View>
                                        </View>
                                    )
                                }}
                        </Async>

                    }
                }
            </Query>

        </View>
    )
}

export default CxPostDetail;
