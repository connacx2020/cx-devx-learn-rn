import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity, ImageBackground, FlatList, Linking, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import { isFollowedSchema, followUserSchema, unfollowUserSchema, getAllCourseByAuthorID } from '../../common/graphQL';
import { serverlessClient, graphqlClient } from '../../common/graphQL/graphql.config';
import { Query } from '@apollo/react-components';


import { styles } from './instructor_styles';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from 'react-redux';

export const InstructorProfile: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { authorID } = route.params
    // console.log(authorID)
    const { colors } = useTheme();
    const [followUser] = useMutation(followUserSchema, { client: graphqlClient });
    const [unfollowUser] = useMutation(unfollowUserSchema, { client: graphqlClient });
    const auth: AuthUserInfo = useSelector((state: any) => state.authUserInfo);

    return (
        <ScrollView style={[styles.wrapper, { backgroundColor: colors.background }]}>
            <Async promise={getCheckedUserInfo(authorID)}>
                {
                   (getUserInfo) => {

                        if (getUserInfo.isLoading) return <View><Text>loading ...</Text></View>
                        if (getUserInfo.error) return <View><Text>{getUserInfo.error}</Text></View>
                        if (getUserInfo.data) {
                            return (
                                <>
                                    <ImageBackground
                                        testID="bgID"
                                        source={{
                                            uri:
                                                "https://cdn4.vectorstock.com/i/1000x1000/77/88/poligonal-background-of-rhombus-gradient-colors-vector-20407788.jpg"
                                        }}
                                        style={styles.header}>
                                        <View style={styles.header_left}>
                                            <TouchableOpacity
                                                style={styles.back_arrow}
                                                onPress={() => navigation.goBack()}>
                                                <FeatherIcon
                                                    testID="iconID"
                                                    name={'arrow-left'}
                                                    size={25}
                                                    color={'#fff'}
                                                />
                                            </TouchableOpacity>
                                            <View style={styles.avator_container}>
                                                <Image
                                                    testID="avatarID"
                                                    style={styles.avatar}
                                                    source={{
                                                        uri: getUserInfo.data.photo
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.header_right}>
                                            <Text testID="nameID" style={styles.user_name}>{getUserInfo.data.name}</Text>

                                            <Query<any, any> query={isFollowedSchema} client={graphqlClient} variables={{ userID1: auth.userID, userID2: authorID }}>
                                                {
                                                    ({ loading, error, data }) => {

                                                        if (error) console.log(error);

                                                        if (loading) return <View style={{ alignSelf: 'center' }} >
                                                            <View>
                                                                <ActivityIndicator size="large" />
                                                            </View>
                                                        </View>
                                                        if (!data.checkIsFollowed) {
                                                            return (
                                                                <View style={styles.connect_follow_field}>
                                                                    <TouchableOpacity style={styles.connect_follow_btn}
                                                                        onPress={() => followUser({
                                                                            variables: { userID1: auth.userID, userID2: authorID },
                                                                            refetchQueries: [{ query: isFollowedSchema, variables: { userID1: auth.userID, userID2: authorID } }]
                                                                        })}
                                                                    >
                                                                        <Text>Follow</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        } else {
                                                            return (
                                                                <View style={styles.connect_follow_field}>
                                                                    <TouchableOpacity style={styles.connect_follow_btn}
                                                                        onPress={() => unfollowUser({
                                                                            variables: { userID1: auth.userID, userID2: authorID },
                                                                            refetchQueries: [{ query: isFollowedSchema, variables: { userID1: auth.userID, userID2: authorID } }]
                                                                        })}
                                                                    >
                                                                        <Text>Unfollow</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        }


                                                    }
                                                }
                                            </Query>


                                            <View style={styles.social_field}>
                                               {
                                                   getUserInfo.data.weblinks.map((item:any)=>{
                                                       if(item.url.search('github') !== -1){
                                                           return(
                                                                <TouchableOpacity
                                                                    testID="githubImgBtnID"
                                                                    onPress={() => Linking.openURL(item.url)}
                                                                    style={styles.icon_field}>
                                                                    <Image
                                                                        style={styles.icon}
                                                                        source={require('../../asset/icons/github.png')}
                                                                    />
                                                                </TouchableOpacity>
                                                           )
                                                        }else if(item.url.search('gmail') !== -1){
                                                            return(
                                                                <TouchableOpacity
                                                                    testID="fbImgBtnID"
                                                                    onPress={() => Linking.openURL(item.url)}
                                                                    style={styles.icon_field}>
                                                                    <Image
                                                                        style={styles.gmail_icon}
                                                                        source={require('../../asset/icons/gmail.png')}
                                                                    />
                                                                </TouchableOpacity>
                                                            )
                                                        }else if(item.url.search("linkedin") !== -1){
                                                            return(
                                                                <TouchableOpacity
                                                                testID="linkedInImgBtnID"
                                                                onPress={() => Linking.openURL(item.url)}
                                                                style={styles.icon_field}>
                                                                <Image
                                                                    style={styles.icon}
                                                                    source={require('../../asset/icons/linkedin.png')}
                                                                />
                                                            </TouchableOpacity>
                                                            )
                                                        }else{
                                                            <TouchableOpacity
                                                                testID="linkedInImgBtnID"
                                                                onPress={() => Linking.openURL(item.url)}
                                                                style={styles.icon_field}>
                                                                <Image
                                                                    style={styles.icon}
                                                                    source={require('../../asset/icons/web.png')}
                                                                />
                                                            </TouchableOpacity>
                                                        }
                                                   })
                                               }


                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.about_field}>
                                            <Text testID="aboutID" style={[styles.about_txt, { color: colors.text }]}>About</Text>
                                            <Text testID="aboutContentID" style={[styles.about_context_txt, { color: colors.text }]}>
                                                {getUserInfo.data.about}
                                            </Text>
                                        </View>
                                        <Query<any, any> query={getAllCourseByAuthorID} client={serverlessClient} variables={{ authorID: authorID }}>
                                            {
                                                ({ loading, error, data }) => {

                                                    if (error) console.log(error);

                                                    if (loading) return <View style={{ alignSelf: 'center' }} >
                                                        <View>
                                                            <ActivityIndicator size="large" />
                                                        </View>
                                                    </View>

                                                    return (
                                                        <View style={styles.profile_content}>
                                                            <FlatList
                                                                testID="flatListID"
                                                                data={data.getCoursesByAuthorId}
                                                                keyExtractor={(item) => item.title}
                                                                renderItem={({ item, index }) => {
                                                                    return (
                                                                        <SearchItemCoverLeft
                                                                            id={item.id}
                                                                            photoUrl={item.photoUrl}
                                                                            title={item.title}
                                                                            rating={item.rating}
                                                                            enrolled={item.enrolled}
                                                                            price={item.price}
                                                                        />
                                                                    );
                                                                }}
                                                            />
                                                        </View>
                                                    )
                                                }
                                            }
                                        </Query>
                                    </View>
                                </>
                            )
                        }
                    }
                }
            </Async>
        </ScrollView>
    );
};
