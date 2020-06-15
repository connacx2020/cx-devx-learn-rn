import React, { useContext, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, Dimensions, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { getCoursesSchema } from '../../common/graphQL';
import { Course } from '../../models/course.model';
import { Query } from '@apollo/react-components';
import {  useSelector } from 'react-redux'

import { CxDevxCourseItem } from '../CourseItem/CourseItem';

import { useNavigation, useTheme } from '@react-navigation/native';
import { View } from 'react-native-animatable';

import { ActivityIndicator } from 'react-native';
import { serverlessClient } from '../../common/graphQL/graphql.config';

function CxDevxFeed({ navigation }: any) {
    const { colors } = useTheme();

    const tabNavigation = useNavigation();
    const parent = tabNavigation.dangerouslyGetParent();
    const userInfo = useSelector((state: any) => state.authUserInfo);

    useFocusEffect(() => {
        parent?.setOptions({ tabBarVisible: true });
    })

    const routeToCourseDetail = (id: string, authourId: string, img: string, title: string) => {
        navigation.navigate("CourseDetail", { id, authourId, image: img, title: title });
    }

    return (
        <ScrollView style={[styles.content, { backgroundColor: colors.background }]}>

            <Query<any, any> client={serverlessClient} query={getCoursesSchema}>
                {
                    ({ loading, error, data }) => {
                        console.log(data);
                        if (error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                        if (loading) return <View style={{ alignSelf: 'center' }} >
                            <View>
                                <ActivityIndicator size="large" />
                            </View>
                        </View>

                        return <View>
                            {/* <Text style={[styles.centerTxt, { color: colors.text }]}>Enrolled Course</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                {data.getAllCourses && data.getAllCourses.map((res: Course) =>
                                    res.enrolledUsers.includes(userInfo.UserID)? 
                                        (
                                            <CxDevxCourseItem
                                                key={res.id}
                                                authorID={res.authorID}
                                                id={res.id}
                                                img={res.photoUrl}
                                                title={res.title}
                                                rate={res.rating}
                                                description={res.description}
                                                enrolled={res.enrolled}
                                                routeToCourseDetail={routeToCourseDetail}
                                            />
                                        ):null
                                    )
                                }
                            </ScrollView> */}
                            
                            <Text style={[styles.centerTxt, { color: colors.text }]}>Recommended for you</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                {data.getAllCourses && data.getAllCourses.map((res: Course) =>
                              
                                    <CxDevxCourseItem
                                        key={res.id}
                                        authorID={res.authorID}
                                        id={res.id}
                                        img={res.photoUrl}
                                        title={res.title}
                                        rate={res.rating}
                                        description={res.description}
                                        enrolled={res.enrolled}
                                        routeToCourseDetail={routeToCourseDetail}
                                    />)
                                }
                            </ScrollView>
                            <Text style={[styles.centerTxt, { color: colors.text }]}>Most Popular</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                {data.getAllCourses && data.getAllCourses.map((res: Course) =>
                                    <CxDevxCourseItem
                                        key={res.id}
                                        authorID={res.authorID}
                                        id={res.id}
                                        img={res.photoUrl}
                                        title={res.title}
                                        rate={res.rating}
                                        description={res.description}
                                        enrolled={res.enrolled}
                                        routeToCourseDetail={routeToCourseDetail}
                                    />)
                                }
                            </ScrollView>
                        </View>
                    }
                }
            </Query>

        </ScrollView>
    )
}



export default CxDevxFeed;
