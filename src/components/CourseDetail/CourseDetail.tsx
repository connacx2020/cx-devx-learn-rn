import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather';


import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';
import { CourseDetailTabs } from '../../Tabs/CourseDetailTabs';
import { getCourseByIdSchema, checkUserIsEnrolledSchema, enrollCourseSchema, unenrollCourseSchema, getCoursesSchema } from '../../common/graphQL';
import { serverlessClient } from '../../common/graphQL/graphql.config';
import { Query } from '@apollo/react-components';
import { useMutation } from '@apollo/react-hooks';
import { AuthUserInfo } from '../../common/redux/redux-actions';


export function CxDevxCourseDetail({ navigation, route }: HomeStackNavProps<"CourseDetail">) {
    const { id } = route.params;
    const tabNavigation = useNavigation();

    const parent = tabNavigation.dangerouslyGetParent();
    const { colors } = useTheme();
    const [enrollHandler] = useMutation(enrollCourseSchema);
    const [unenrollHandler] = useMutation(unenrollCourseSchema);
    const userInfo: AuthUserInfo = useSelector((state: any) => state.authUserInfo);

    useEffect(() => {
        parent?.setOptions({ tabBarVisible: false })
    });

    return (
        <ScrollView style={styles.container}>
            <Query<any, any> query={getCourseByIdSchema} variables={{ courseID: id }} >
                {
                    (fetchCourseById) => {

                        if (fetchCourseById.loading) return (
                            <View style={{ alignSelf: 'center' }}>
                                <View>
                                    <ActivityIndicator size="large" />
                                </View>
                            </View>
                        )

                        if (fetchCourseById.error) return <View><Text>Error</Text></View>

                        if (fetchCourseById.data) {
                            return (
                                <View>
                                    <View style={styles.header}>
                                        {
                                            fetchCourseById.data.findCourseByID.photoUrl !== '' ? <Image
                                                style={styles.header_course_img}
                                                source={{
                                                    uri: fetchCourseById.data.findCourseByID.photoUrl
                                                }}
                                            /> : <View style={{ backgroundColor: '#2289f0', flex: 1, flexDirection: 'row', width: '100%' }} />
                                        }

                                        <TouchableOpacity
                                            onPress={() => navigation.goBack()}
                                            style={styles.header_left_arrow}
                                        >
                                            <FeatherIcon name={"arrow-left"} size={30} color={"#2541B2"} />
                                        </TouchableOpacity>
                                        <Text style={[styles.header_title, { color: colors.text }]}>{fetchCourseById.data.findCourseByID.title}</Text>
                                        <Query<any, any> query={checkUserIsEnrolledSchema} client={serverlessClient} variables={{ courseID: fetchCourseById.data.findCourseByID.id, userID: userInfo.userID }}>
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
                                                                    variables: { courseID: fetchCourseById.data.findCourseByID.id, userID: userInfo.userID },
                                                                    refetchQueries: [{ query: checkUserIsEnrolledSchema, variables: { courseID: fetchCourseById.data.findCourseByID.id, userID: userInfo.userID } }, { query: getCoursesSchema }]
                                                                })}
                                                            >
                                                                <Text style={styles.header_btn_txt}> Enroll this course </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity style={styles.header_btn_red}
                                                                onPress={() => unenrollHandler({
                                                                    variables: { courseID: fetchCourseById.data.findCourseByID.id, userID: userInfo.userID },
                                                                    refetchQueries: [{ query: checkUserIsEnrolledSchema, variables: { courseID: fetchCourseById.data.findCourseByID.id, userID: userInfo.userID } }, { query: getCoursesSchema }]
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
                                            {...fetchCourseById.data.findCourseByID}
                                        />
                                    </View>
                                </View>
                            )
                        } return (
                            <View></View>
                        )
                    }
                }

            </Query>
        </ScrollView>
    )
}
