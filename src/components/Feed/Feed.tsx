import React, { useContext, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, Dimensions, ToastAndroid, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { getCoursesSchema } from '../../common/graphQL';
import { Course } from '../../models/course.model';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux'

import { CxDevxCourseItem } from '../CourseItem/CourseItem';

import { useNavigation, useTheme } from '@react-navigation/native';
import { View } from 'react-native-animatable';

import { ActivityIndicator } from 'react-native';
import { serverlessClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';


function CxDevxFeed({ navigation }: any) {
    const { colors } = useTheme();

    const tabNavigation = useNavigation();
    const parent = tabNavigation.dangerouslyGetParent();
    const userInfo: AuthUserInfo = useSelector((state: any) => state.authUserInfo);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);

    useFocusEffect(() => {
        parent?.setOptions({ tabBarVisible: true });
    })

    const routeToCourseDetail = (id: string, authourId: string, img: string, title: string) => {
        navigation.navigate("CourseDetail", { id, authourId, image: img, title: title });
    }

    return (
        <Query<any, any> client={serverlessClient} query={getCoursesSchema}>
            {
                ({ loading, error, data, refetch }) => {

                    if (error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                    if (loading) return <View style={{ alignSelf: 'center' }} >
                        <View>
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
                                    <Text style={[styles.centerTxt, { color: colors.text }]}>Enrolled Course</Text>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                        {data.getAllCourses && data.getAllCourses.map((res: Course) =>
                                            res.enrolledUsers.includes(userInfo.userID) ?
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
                                                ) : null
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

                                <View>
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
                            </> : <View>
                                <Text>No data receieved from server check connection.</Text>
                            </View>}
                    </ScrollView>

                }
            }
        </Query>
    )
}



export default CxDevxFeed;
