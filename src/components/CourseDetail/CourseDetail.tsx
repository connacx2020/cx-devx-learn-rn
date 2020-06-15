import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import {  useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather';


import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';
import { CourseDetailTabs } from '../../Tabs/CourseDetailTabs';
import { getCourseByIdSchema,checkUserIsEnrolled,enrollCourse,unenrollCourse } from '../../common/graphQL';
import { serverlessClient } from '../../common/graphQL/graphql.config';
import { Query } from '@apollo/react-components';
import { useMutation } from '@apollo/react-hooks';


export function CxDevxCourseDetail({ navigation, route }: HomeStackNavProps<"CourseDetail">) {
    const { id } = route.params;
    const tabNavigation = useNavigation();

    const parent = tabNavigation.dangerouslyGetParent();
    const { colors } = useTheme();
    const [enrollHandler] = useMutation(enrollCourse, { client: serverlessClient });
    const [unenrollHandler] = useMutation(unenrollCourse, { client: serverlessClient });
    const userInfo = useSelector((state: any) => state.authUserInfo);

    useEffect(() => {
        parent?.setOptions({ tabBarVisible: false })
    });

    return (
        <ScrollView style={styles.container}>
            <Query<any, any> query={getCourseByIdSchema} client={serverlessClient} variables={{ courseID: id }} >
                {
                    ({ loading, error, data }) => {
              
                        if (loading) return (<View style={{ alignSelf: 'center' }} >
                            <View>
                                <ActivityIndicator size="large" />
                                {/* <Text>Loading</Text> */}
                            </View>
                        </View>)

                        if (error) return <View><Text>Error</Text></View>

                         return (
                            <View>
                                <View style={styles.header}>
                                    <Image
                                        style={styles.header_course_img}
                                        source={{
                                            uri: data.getCourseById.photoUrl
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={styles.header_left_arrow}
                                    >
                                        <FeatherIcon name={"arrow-left"} size={30} color={"#2541B2"} />
                                    </TouchableOpacity>
                                    <Text style={[styles.header_title, { color: colors.text }]}>{data.getCourseById.title}</Text>
                                    <Query<any, any> query={checkUserIsEnrolled} client={serverlessClient} variables={{ courseID: data.getCourseById.id, userID: userInfo.userID }}>
                                                {
                                                    checkIsEnrollData => {
                                                        if (checkIsEnrollData.error) console.log(checkIsEnrollData.error);

                                                        if (checkIsEnrollData.loading) return <View style={{ alignSelf: 'center' }} >
                                                            <View>
                                                                <ActivityIndicator size="large" />
                                                            </View>
                                                        </View>
                                                        if (!checkIsEnrollData.data.checkUserIsEnrolled) {
                                                            return (
                                                                <TouchableOpacity style={styles.header_btn_blue}
                                                                    onPress={() => enrollHandler({
                                                                        variables: { courseID:data.getCourseById.id, userID: userInfo.userID },
                                                                        refetchQueries: [{ query: checkUserIsEnrolled, variables:  { courseID:data.getCourseById.id, userID: userInfo.userID } }]
                                                                    })}
                                                                >
                                                                    <Text style={styles.header_btn_txt}> Enroll this course </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        } else {
                                                            return (
                                                                <TouchableOpacity style={styles.header_btn_red}
                                                                    onPress={() => unenrollHandler({
                                                                        variables: { courseID:data.getCourseById.id, userID:  userInfo.userID },
                                                                        refetchQueries: [{ query: checkUserIsEnrolled, variables:  { courseID:data.getCourseById.id, userID: userInfo.userID } }]
                                                                    })}
                                                                >
                                                                    <Text style={styles.header_btn_txt}> Unenroll this course </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }


                                                    }
                                                }
                                            </Query>
                                    
                                </View>

                                <View style={styles.footer_tabs}>
                                    <CourseDetailTabs
                                    {...data.getCourseById}
                                    />
                                </View>
                            </View>
                        )
                    }
                }

            </Query>
        </ScrollView>
    )
}
