import React, { useContext, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, Dimensions, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';

import { styles } from './styles';
import { getCoursesSchema } from '../../common/graphQL';
import { Course } from '../../models/course.model';
import { Query } from '@apollo/react-components';


import { CxDevxCourseItem } from '../CourseItem/CourseItem';

import { useNavigation, useTheme } from '@react-navigation/native';
import { View } from 'react-native-animatable';
import  ApolloClient  from 'apollo-boost';
import { ENV } from '../../common/envirnoment';
import { ActivityIndicator } from 'react-native';

function CxDevxFeed({ navigation }: any) {
    const { colors } = useTheme();

    const tabNavigation = useNavigation();
    const parent = tabNavigation.dangerouslyGetParent();

    // const serverlessClient = new ApolloClient({
    //     uri: `http://192.168.43.93:3000/dev/graphql`,
    // });

    const serverlessClient = new ApolloClient({
        uri: `https://noq5efwak3.execute-api.ap-southeast-1.amazonaws.com/dev/graphql`,
    });

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

                        if (error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                        if (loading) return <View style={{ alignSelf: 'center' }} >
                            <View>
                                <ActivityIndicator size="large" />
                            </View>
                        </View>

                        return <View>
                            <Text style={[styles.centerTxt, { color: colors.text }]}>Recommended for you</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row', overflow: 'visible' }}>
                                {
                                    data.getAllCourses.map((res: Course) =>
                                        <CxDevxCourseItem
                                            key={res.id}
                                            authourID={res.authorID}
                                            id={res.id}
                                            img={res.photoUrl}
                                            title={res.title}
                                            rate={parseFloat(res.rating)}
                                            routeToCourseDetail={routeToCourseDetail}
                                        />)
                                }
                            </ScrollView>
                            <Text style={[styles.centerTxt, { color: colors.text }]}> Most Popular </Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ display: 'flex', flexDirection: 'row' }}>
                                {
                                    data.getAllCourses.map((res: Course) =>
                                        <CxDevxCourseItem
                                            key={res.id}
                                            authourID={res.authorID}
                                            id={res.id}
                                            img={res.photoUrl}
                                            title={res.title}
                                            rate={parseFloat(res.rating)}
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
