import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';
import { CourseDetailTabs } from '../../Tabs/CourseDetailTabs';
import { getCourseByIdSchema } from '../../common/graphQL';
import { serverlessClient } from '../../common/graphQL/graphql.config';
import { Query } from '@apollo/react-components';


export function CxDevxCourseDetail({ navigation, route }: HomeStackNavProps<"CourseDetail">) {
    const { id } = route.params;
    const tabNavigation = useNavigation();

    const parent = tabNavigation.dangerouslyGetParent();
    const { colors } = useTheme();

    useEffect(() => {
        parent?.setOptions({ tabBarVisible: false })
    });

    return (
        <ScrollView style={styles.container}>
            <Query<any, any> query={getCourseByIdSchema} variables={{ courseID: id }} client={serverlessClient}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return (<View style={{ alignSelf: 'center' }} >
                            <View>
                                <ActivityIndicator size="large" />
                                {/* <Text>Loading</Text> */}
                            </View>
                        </View>)

                        if (error) return <View><Text>Error</Text></View>

                        if (data) return (
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
                                    <TouchableOpacity style={styles.header_btn}>
                                        <Text style={styles.header_btn_txt}> Enroll this course </Text>
                                    </TouchableOpacity>
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
