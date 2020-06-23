import React, { useContext, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, Dimensions, ToastAndroid, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { getCoursesSchema, getPostSeriesByIdSchema } from '../../common/graphQL';

import { Course } from '../../models/course.model';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux'

import { CxDevxCourseItem } from '../CourseItem/CourseItem';
import { CxDevxEntrolledCourseItem } from '../CourseItem/EnrolledCourseItem'

import { useNavigation, useTheme } from '@react-navigation/native';
import { View } from 'react-native-animatable';

import { ActivityIndicator } from 'react-native';
import { serverlessClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { reach } from 'yup';


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

    const routeToCourseDetail = (id: string, authourId: string, img: string, title: string) => {
        navigation.navigate("CourseDetail", { id, authourId, image: img, title: title });
    }
    const routeToEnrolledCourseSection = (title: string, postID: string, postSeries: string) => {
        navigation.navigate('CourseSection', { course: title, postID, postSeries })
    }

    React.useEffect(() => {
    }, [hasEnrolled])

    return (
        <Query<any, any> client={serverlessClient} query={getCoursesSchema}>
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
                                <View>
                                    {hasEnrolled && <Text style={[styles.centerTxt, { color: colors.text }]}>Enrolled Course</Text>}
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                        {data.getAllCourses && data.getAllCourses.map((res: Course) =>
                                            res.enrolledUsers.includes(userInfo.userID) ?
                                                (
                                                    <Query<any, any> query={getPostSeriesByIdSchema} variables={{ seriesID: res.seriesID }}>
                                                        {
                                                            courseSeriesByIdData => {
                                                                setHasEnrolled(true)
                                                                if (courseSeriesByIdData.loading) return <Text>Loading...</Text>
                                                                if (courseSeriesByIdData.error) return <Text>Error</Text>

                                                                return (
                                                                    <TouchableOpacity onPress={() => routeToEnrolledCourseSection(res.title, courseSeriesByIdData.data.getPostSeries.posts[0].id, courseSeriesByIdData.data.getPostSeries.posts)}>
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
                                </View>
                                <View>
                                    <Text style={[styles.centerTxt, { color: colors.text }]}>Recommended for you</Text>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                        {data.getAllCourses && data.getAllCourses.map((res: Course) =>

                                            <CxDevxCourseItem
                                                key={res.id}
                                                authorID={res.authorID}
                                                id={res.id}
                                                price={res.price}
                                                img={res.photoUrl}
                                                title={res.title}
                                                rating={res.rating}
                                                description={res.description}
                                                enrolled={res.enrolled}
                                                routeToCourseDetail={routeToCourseDetail}
                                            />)
                                        }
                                    </ScrollView>
                                </View>
                                <View>
                                    <Text style={[styles.centerTxt, { color: colors.text }]}>Most Popular</Text>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                        {data.getAllCourses && data.getAllCourses.map((res: Course) =>
                                            <CxDevxCourseItem
                                                key={res.id}
                                                authorID={res.authorID}
                                                price={res.price}
                                                id={res.id}
                                                img={res.photoUrl}
                                                title={res.title}
                                                rating={res.rating}
                                                description={res.description}
                                                enrolled={res.enrolled}
                                                routeToCourseDetail={routeToCourseDetail}
                                            />)
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
