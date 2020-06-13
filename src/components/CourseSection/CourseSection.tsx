import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { styles } from './style'
import { CxDevxCommentModal } from '../CommentModalBox';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { useTheme } from '@react-navigation/native'
import { Query } from '@apollo/react-components';
import { getPostByIDSchema, getPrevPostIDSchema, getNextPostIDSchema } from '../../common/graphQL';
import { Async } from 'react-async';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { useQuery } from '@apollo/react-hooks';

function CxDevxCourseSection({ navigation, route }: HomeStackNavProps<"CourseSection">) {
    let [isLiked, setLike] = useState<Boolean>(false);
    let [isModalVisible, setModalVisible] = useState<Boolean>(false);
    const postID = route.params.postID;
    const { colors } = useTheme();

    const [isFirstPost, setIsFirstPost] = React.useState(false);
    const [isLastPost, setIsLastPost] = React.useState(true);
    const [nextPostID, setNextPostID] = React.useState('');
    const [prevPostID, setPrevPostID] = React.useState('');
    const getPrevPost = useQuery(getPrevPostIDSchema, { variables: { postID }, notifyOnNetworkStatusChange: true });
    const getNextPost = useQuery(getNextPostIDSchema, { variables: { postID }, notifyOnNetworkStatusChange: true });

    useEffect(() => {
        console.log(route);
        navigation.setOptions({ title: route.params.course })
        if (getPrevPost.data && getNextPost.data) {
            setPrevPostID(getPrevPost.data.getPrevPost);
            setNextPostID(getNextPost.data.getNextPost);
        }
        if (prevPostID === '') {
            setIsFirstPost(true)
        } else {
            setIsFirstPost(false);
        }
        if (nextPostID === '') {
            setIsLastPost(true)
        } else {
            setIsLastPost(false);
        }
    }, [route.params.course])



    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (

        <GestureRecognizer
            // onSwipeUp={() => console.log("SwipeUp")}
            // onSwipeDown={() => console.log("SwipeDown") }
            // onSwipeLeft={() => navigation.navigate('CourseSection', { course: 'What is Angular?', postID: prevPostID })}
            // onSwipeRight={() => navigation.navigate('CourseSection', { course: 'Introduction', postID: '52fbafbb-93b9-4ac2-8f31-243f628ac135' })}
            config={config}
            style={styles.wrapper}
        >
            <View style={[styles.container, { backgroundColor: colors.background }]}>

                <Query<any, any> query={getPostByIDSchema} variables={{ postID: postID }}>
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

                                                <ScrollView style={{ backgroundColor: '#fff', }}>

                                                    <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.5, paddingBottom: 5 }}>

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

                                                    <TouchableOpacity>
                                                        <Text style={{ color: colors.text }}>{fetchPostByID.data.searchPostByID.likes} Likes</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => setModalVisible(!isModalVisible)}
                                                    >
                                                        <Text style={{ color: colors.text }}>Comments</Text>
                                                    </TouchableOpacity>

                                                    <View >
                                                        <Text style={{ color: colors.text }}>{fetchPostByID.data.searchPostByID.views}Views</Text>
                                                    </View>
                                                </View>

                                            </View>
                                        )
                                    }}
                            </Async>

                        }
                    }
                </Query>
                <CxDevxCommentModal isLiked={isLiked} isModalVisible={isModalVisible} setLike={setLike} setModalVisible={setModalVisible} />
            </View>

        </GestureRecognizer >



    )
}


export default CxDevxCourseSection;
