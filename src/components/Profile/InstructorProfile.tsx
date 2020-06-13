import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity, ImageBackground, FlatList, Linking, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useMutation,useQuery } from '@apollo/react-hooks';
import AsyncStorage from "@react-native-community/async-storage";

import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import { isFollowedSchema,followUserSchema,unfollowUserSchema,getAllCourseByAuthorID } from '../../common/graphQL';

import { styles } from './instructor_styles';

export const InstructorProfile: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { authourId } = route.params
    const [userID,setUserID] = React.useState<string>("");
    const { colors } = useTheme();
    const [followUser] = useMutation(followUserSchema);
    const [unfollowUser] = useMutation(unfollowUserSchema);
    const {data : followData} = useQuery(isFollowedSchema,{
        variables:{ userID1: userID, userID2:authourId  }
    });
    const authorCoursesData = useQuery(getAllCourseByAuthorID,{
        variables:{authorId:authourId}
    });

    useEffect(() => {
        AsyncStorage.getItem("devx_token")
            .then(async (localToken: any) => {
                const localData = JSON.parse(localToken);
                setUserID(localData.userID)  
            })
            .catch(err => {
                console.log(err);
            });
    }, [authourId]);

    const courseData = [
        {
            img:
                'https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg',
            title: 'GraphQL Advanced Course',
            rate: 4.5,
            likes: 1000,
            enrolled: 531,
        },
        {
            img:
                'https://miro.medium.com/max/2880/1*xcDT-neKHP7E3quS9n30gw.png',
            title: 'React Hooks Course',
            rate: 5,
            likes: 1500,
            enrolled: 321,
        },
        {
            img:
                'https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png',
            title: 'Nodejs Advanced Course',
            rate: 4,
            likes: 784,
            enrolled: 212,
        },
        {
            img: 'https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg',
            title: 'React Native With Typescript',
            rate: 4,
            likes: 1000,
            enrolled: 651,
        },
        {
            img:
                'https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png',
            title: 'GraphQL with Neo4j  Course',
            rate: 5,
            likes: 1000,
            enrolled: 531,
        },
    ];
    return (
        <ScrollView style={[styles.wrapper, { backgroundColor: colors.background }]}>
            <Async promise={getCheckedUserInfo(authourId)}>
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
                                          
                                                       {
                                                          
                                                
                                                            !followData.checkIsFollowed ?
                                                                <View style={styles.connect_follow_field}>
                                                                    <TouchableOpacity style={styles.connect_follow_btn}
                                                                        onPress={()=>followUser({ variables: { userID1: userID, userID2: authourId},
                                                                        refetchQueries:[{query:isFollowedSchema,variables:{ userID1: userID, userID2: authourId }}]  })}
                                                                    >
                                                                        <Text>Follow</Text>
                                                                    </TouchableOpacity>
                                                                </View> :
                                                                <View style={styles.connect_follow_field}>
                                                                    <TouchableOpacity style={styles.connect_follow_btn}
                                                                         onPress={()=>unfollowUser({ variables: { userID1: userID, userID2: authourId}, 
                                                                         refetchQueries:[{query:isFollowedSchema,variables:{ userID1: userID, userID2: authourId }}] })}
                                                                    >
                                                                        <Text>Unfollow</Text>
                                                                    </TouchableOpacity>
                                                                </View>


                                                       }
                                                  

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
                                        <View style={styles.profile_content}>
                                            <FlatList
                                                testID="flatListID"
                                                data={authorCoursesData.getCoursesByAuthorId}
                                                keyExtractor={(item) => item.title}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <SearchItemCoverLeft
                                                            img={item.photoUrl}
                                                            title={item.title}
                                                            rate={item.rating}
                                                            enrolled={item.enrolled}
                                                        />
                                                    );
                                                }}
                                            />
                                        </View>
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
