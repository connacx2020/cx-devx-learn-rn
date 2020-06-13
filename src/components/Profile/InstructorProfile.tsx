import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity, ImageBackground, FlatList, Linking, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import AsyncStorage from "@react-native-community/async-storage";

import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import { isFollowedSchema, followUserSchema, unfollowUserSchema, getAllCourseByAuthorID } from '../../common/graphQL';
import { serverlessClient, graphqlClient } from '../../common/graphQL/graphql.config';
import { Query } from '@apollo/react-components';


import { styles } from './instructor_styles';

export const InstructorProfile: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { authorID } = route.params
    console.log(authorID)
    const [userID, setUserID] = React.useState<string>("");
    const { colors } = useTheme();
    const [followUser] = useMutation(followUserSchema, { client: graphqlClient });
    const [unfollowUser] = useMutation(unfollowUserSchema, { client: graphqlClient });
    // const { data: followData,error:followError } = useQuery(isFollowedSchema, {
    //     variables: { userID1: userID, userID2: authorID },client:graphqlClient
    // });
    // console.log(followError);
    // console.log(followData)
    useEffect(() => {
        AsyncStorage.getItem("devx_token")
            .then(async (localToken: any) => {
                const localData = JSON.parse(localToken);
                setUserID(localData.userID)
            })
            .catch(err => {
                console.log(err);
            });
    }, [authorID]);

    return (
        <ScrollView style={[styles.wrapper, { backgroundColor: colors.background }]}>
            <Async promise={getCheckedUserInfo(authorID)}>
                {
                    ({ data, error, isLoading }) => {

                        if (isLoading) return <View><Text>loading</Text></View>
                        if (error) return <View><Text>{error}</Text></View>
                        if (data) {
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
                                                        uri: data.photo
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.header_right}>
                                            <Text testID="nameID" style={styles.user_name}>{data.name}</Text>

                                            <Query<any, any> query={isFollowedSchema} client={graphqlClient} variables={{ userID1: userID, userID2: authorID }}>
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
                                                                            variables: { userID1: userID, userID2: authorID },
                                                                            refetchQueries: [{ query: isFollowedSchema, variables: { userID1: userID, userID2: authorID } }]
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
                                                                            variables: { userID1: userID, userID2: authorID },
                                                                            refetchQueries: [{ query: isFollowedSchema, variables: { userID1: userID, userID2: authorID } }]
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
                                                <TouchableOpacity
                                                    testID="githubImgBtnID"
                                                    onPress={() => Linking.openURL(data.weblinks[0].url)}
                                                    style={styles.icon_field}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={require('../../asset/icons/github.png')}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    testID="fbImgBtnID"
                                                    onPress={() => Linking.openURL(data.weblinks[1].url)}
                                                    style={styles.icon_field}>
                                                    <Image
                                                        style={styles.gmail_icon}
                                                        source={require('../../asset/icons/gmail.png')}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    testID="linkedInImgBtnID"
                                                    onPress={() => Linking.openURL(data.weblinks[0].url)}
                                                    style={styles.icon_field}>
                                                    <Image
                                                        style={styles.icon}
                                                        source={require('../../asset/icons/linkedin.png')}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.about_field}>
                                            <Text testID="aboutID" style={[styles.about_txt, { color: colors.text }]}>About</Text>
                                            <Text testID="aboutContentID" style={[styles.about_context_txt, { color: colors.text }]}>
                                                {data.about}
                                            </Text>
                                        </View>
                                        <Query<any, any> query={getAllCourseByAuthorID} client={serverlessClient} variables={{ authorId: authorID }}>
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
                                                                            rate={item.rating}
                                                                            enrolled={item.enrolled}
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
