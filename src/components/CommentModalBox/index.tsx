import React from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput, ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style';
import { useTheme } from '@react-navigation/native';
import { Comment } from '../../models/post.model';
import { Async } from 'react-async';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { useMutation } from '@apollo/react-hooks';
import { addCommentSchema } from '../../common/graphQL';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from 'react-redux';
import { from } from 'rxjs';

type CommentModalProps = {
    isLiked: Boolean;
    isModalVisible: Boolean;
    setLike: () => void;
    setModalVisible: () => void;
    addCommentPressed: () => void;
    addCommentInput: () => void;
    commentInputValue: string;
    commentInfo: [any];
    postID: string;
};

export const CxDevxCommentModal: React.FC<CommentModalProps> = ({
    isLiked,
    isModalVisible,
    setLike,
    setModalVisible,
    commentInfo,
    postID
}) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const { colors } = useTheme();

    const [addComment] = useMutation(addCommentSchema, { client: graphqlClient });
    const auth: AuthUserInfo = useSelector((state: any) => state.authUserInfo);
    const [commentInput, setCommentInput] = React.useState<string>('');

    const onPressEnterComment = () => {
        // console.log(commentInput);
        const newComment: Comment = {
            postID: postID,
            authorID: auth.userID,
            content: commentInput,
            likes: 0,
            comments: []
        }
        if (commentInput !== '') {
            setCommentInput('')
            from(addComment({ variables: newComment }))
                .subscribe(
                    (res: any) => {
                        ToastAndroid.show("Comment Success", 1000)
                    },
                    err => {
                        console.log(err);
                    }
                );
                commentInfo.push({...commentInfo,
                    postID: postID,
                    authorID: auth.userID,
                    content: commentInput,
                    likes: 0,
                    comments: [],
                    commentedOn: new Date()
                })
        }
        else {
            ToastAndroid.show("Comment Fail", 1000)
        }
    }

    return (
        <Modal
            deviceWidth={screenWidth}
            deviceHeight={screenHeight}
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible(false)}>
            <View style={[styles.modal, { backgroundColor: colors.background }]}>

                <View style={styles.modal_header}>
                    <TouchableOpacity
                        style={styles.modal_header_back_left}
                        onPress={() => setModalVisible(!isModalVisible)}>
                        <FeatherIcon
                            name={'arrow-left'}
                            size={25}
                            color={'#7C7879'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLike(!isLiked)}
                        style={styles.modal_header_likes_right}>
                        {!isLiked ? (
                            <AntdIcon
                                name={'like2'}
                                size={25}
                                color={'#6D696A'}
                            />
                        ) : (
                                <AntdIcon
                                    name={'like1'}
                                    size={25}
                                    color={'#1E91D6'}
                                />
                            )}
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.modal_content}>
                    <View>
                        {
                            commentInfo.map((res, index) => <View key={index} style={styles.modal_comment_container}>

                                <Async promise={getCheckedUserInfo(res.authorID)}>

                                    {(getCommentUserInfo) => {
                                        if (getCommentUserInfo.isLoading) return <Text>Loading...</Text>
                                        if (getCommentUserInfo.error) return <Text>Error...</Text>

                                        return <View style={styles.modal_comment_hader}>
                                            <View
                                                style={
                                                    styles.modal_comment_header_avatar_lfield
                                                }>
                                                <Image
                                                    style={styles.modal_avatar}
                                                    source={{
                                                        uri: getCommentUserInfo.data.photo
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={
                                                    styles.modal_comment_header_userInfo_rfield
                                                }>
                                                <Text style={[styles.modal_user_info_txt, { color: colors.text }]}>
                                                    {getCommentUserInfo.data.name}
                                                </Text>
                                                <Text style={[styles.modal_comment_time_txt, { color: colors.text }]}>
                                                    {new Date(res.commentedOn).toLocaleString()}
                                                </Text>
                                            </View>
                                        </View>
                                    }
                                    }

                                </Async>

                                <View style={styles.modal_comment_content}>
                                    <Text style={[styles.modal_comment_content_txt, { color: colors.text }]}>
                                        {res.content}
                                    </Text>
                                </View>
                            </View>)
                        }
                    </View>

                </ScrollView>

                <View style={styles.modal_footer}>
                    <TextInput
                        value={commentInput}
                        style={styles.modal_comment_txtinput}
                        placeholder="Write a comment ..."
                        multiline={true}
                        onChangeText={text => setCommentInput(text)}
                    />
                    <TouchableOpacity style={{ padding: 10, marginRight: 5 }} onPress={onPressEnterComment}>
                        <MaterialIcon
                            name={'send'}
                            size={30}
                            color={'#7C7879'}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};
