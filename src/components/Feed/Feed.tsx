import React, { useContext, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, Dimensions, ToastAndroid, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { getCoursesSchema } from '../../common/graphQL';

import { Course } from '../../models/course.model';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux'

import { CxDevxCourseItem } from '../course/CourseItem/CourseItem';

import { useNavigation, useTheme } from '@react-navigation/native';
import { View } from 'react-native-animatable';

import { ActivityIndicator } from 'react-native';
import { AuthUserInfo } from '../../common/redux/redux-actions';

function CxDevxFeed({ navigation }: any) {
    const { colors } = useTheme();

    const tabNavigation = useNavigation();
    const parent = tabNavigation.dangerouslyGetParent();
    const userInfo: AuthUserInfo = useSelector((state: any) => state.authUserInfo);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [hasEnrolled, setHasEnrolled] = React.useState<boolean>(false);

    useFocusEffect(() => {
        parent?.setOptions({ tabBarVisible: true });
    })

    const routeToCourseDetail = (id: string, img: string, title: string, author: Record<string, any>) => {
        navigation.navigate("CourseDetail", { id, author, image: img, title: title });
    }
    const routeToEnrolledCourseSection = (title: string, postID: string, postSeries: string) => {
        navigation.navigate('CourseSection', { course: title, postID, postSeries })
    }

    React.useEffect(() => {
    }, [hasEnrolled])

    return (
        <Query<any, any> query={getCoursesSchema}>
            {
                ({ loading, error, data, refetch }) => {

                    if (error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                    if (loading) return <View style={{ alignSelf: 'center' }} >
                        <View style={styles.query_info}>
                            <ActivityIndicator size="large" />
                        </View>
                    </View>

                    return <ScrollView style={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    setRefreshing(true)
                                    refetch().then((res: any) => { setRefreshing(false) });
                                }}
                            />}>
                        {data ?
                            <>
                                {/* <View>
                                    {hasEnrolled && <Text style={[styles.centerTxt, { color: colors.text }]}>Enrolled Course</Text>}
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                        {data.getAllCourses && data.getAllCourses.map((res: Course, index: number) =>
                                            res.enrolledUsers.includes(userInfo.userID) ?
                                                (
                                                    <Query<any, any> query={getPostSeriesByIdSchema} variables={{ seriesID: res.seriesID }}>
                                                        {
                                                            courseSeriesByIdData => {
                                                                setHasEnrolled(true)
                                                                if (courseSeriesByIdData.loading) return <Text key={index}>Loading...</Text>
                                                                if (courseSeriesByIdData.error) return <Text key={index}>Error</Text>

                                                                return (
                                                                    <TouchableOpacity key={res.id} onPress={() => routeToEnrolledCourseSection(res.title, courseSeriesByIdData.data.getPostSeries.posts[0].id, courseSeriesByIdData.data.getPostSeries.posts)}>
                                                                        <CxDevxEntrolledCourseItem
                                                                            key={res.id}
                                                                            authorID={res.authorID}
                                                                            id={res.id}
                                                                            img={res.photoUrl}
                                                                            title={res.title}
                                                                            rating={res.rating}
                                                                            description={res.description}
                                                                            enrolled={res.enrolled}

                                                                        />

                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        }
                                                    </Query>
                                                ) : setHasEnrolled(false)
                                        )
                                        }
                                    </ScrollView>
                                </View> */}

                                <View>
                                    <View>
                                        {
                                            data.getAllCourses.length > 0 && <Text style={[styles.centerTxt, { color: colors.text }]}>Recommended for you</Text>
                                        }
                                    </View>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>

                                        {
                                            data.getAllCourses && data.getAllCourses.map((res: any) =>
                                                <CxDevxCourseItem
                                                    key={res.id}
                                                    author={res.author}
                                                    id={res.id}
                                                    price={res.price}
                                                    img={res.photoUrl}
                                                    title={res.title}
                                                    rating={res.rating}
                                                    description={res.description}
                                                    enrolls={res.courseRelatedData.enrolls}
                                                    routeToCourseDetail={routeToCourseDetail}
                                                />
                                            )
                                        }
                                    </ScrollView>
                                </View>

                                <View>
                                    <View>
                                        {
                                            data.getAllCourses.length > 0 ? <Text style={[styles.centerTxt, { color: colors.text }]}>Most Popular</Text> : <Text>No Course</Text>
                                        }
                                    </View>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>

                                        {
                                            data.getAllCourses && data.getAllCourses.reverse().map((res: any) =>
                                                <CxDevxCourseItem
                                                    key={res.id}
                                                    author={res.author}
                                                    id={res.id}
                                                    price={res.price}
                                                    img={res.photoUrl}
                                                    title={res.title}
                                                    rating={res.rating}
                                                    description={res.description}
                                                    enrolls={res.courseRelatedData.enrolls}
                                                    routeToCourseDetail={routeToCourseDetail}
                                                />
                                            )
                                        }
                                    </ScrollView>
                                </View>

                            </> : <View style={styles.query_info}>
                                <Text>No data receieved from server check connection.</Text>
                            </View>}
                    </ScrollView>

                }
            }
        </Query>
    )
}



export default CxDevxFeed;
