import React from 'react';
import { View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { useTheme, useNavigation } from '@react-navigation/native';
import { TouchableRipple, Paragraph, Divider, useTheme as PaperTheme } from 'react-native-paper';
import ViewMoreText from 'react-native-view-more-text';
import { Query } from '@apollo/react-components';

import { getUserInfoByIdSchema } from '../../common/graphQL';

import { styles } from './style';
import { Course } from '../../models';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';

function CxDevxCourseOverview(props: Course) {
    const navigation = useNavigation();
    const paperTheme = PaperTheme();
    const { colors } = useTheme();
    const renderViewMore = (onPress: any) => {
        return (
            <Text style={[styles.show_more_less_txt, { color: colors.text }]} onPress={onPress}>View more</Text>
        )
    }
    const renderViewLess = (onPress: any) => {
        return (
            <Text style={[styles.show_more_less_txt, { color: colors.text }]} onPress={onPress}>View less</Text>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.feedback_overview, { backgroundColor: colors.background }]}>
                <Text style={[styles.course_info_text, { color: colors.text }]}>Course Info</Text>
                <View style={styles.cinfo_row}>
                    <Text style={[styles.cinfo_title, , { color: colors.text }]}>Rating</Text>
                    <View style={styles.rating_field}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={props.rating}
                            starSize={17}
                            starStyle={styles.star as StyleProp<ViewStyle>}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.cinfo_row}>
                    <Text style={[styles.cinfo_title, , { color: colors.text }]}>Enroll</Text>
                    <Text style={[styles.cinfo_value_txt, { color: colors.text }]}><MCIcon name="file-document-edit-outline" size={16} color={!paperTheme.dark ? "#333" : '#fff'} />  {props.enrolled}</Text>
                </View>
                <Divider />
                <View style={styles.cinfo_row}>
                    <Text style={[styles.cinfo_title, { color: colors.text }]}>Duration</Text>
                    <Text style={[styles.cinfo_value_txt, { color: colors.text }]}>{props.duration} <IonicIcon name="md-time" size={16} color={!paperTheme.dark ? "#333" : '#fff'} /></Text>
                </View>
                <Divider />
                <View style={styles.desc_field}>
                    <Text style={[styles.desc_txt, { color: colors.text }]}>Description</Text>
                    <ViewMoreText
                        numberOfLines={2}
                        renderViewMore={renderViewMore}
                        renderViewLess={renderViewLess}
                        textStyle={[styles.desc_info_txt, { color: colors.text }]}
                    >
                        <Text>
                            {props.description}
                        </Text>
                    </ViewMoreText>
                </View>
            </View>

            <View style={[styles.user_overview, { backgroundColor: colors.background }]}>
                <View style={styles.user_container}>
                    <Async promise={getCheckedUserInfo(props.authorID)}>
                        {
                            ({ data, error, isLoading }) => {
                                if (isLoading) return <View><Text>loading</Text></View>
                                if (error) return <View><Text>err</Text></View>
                                if (data) {
                                    return (<React.Fragment>
                                        <TouchableRipple style={styles.user_avatar_field} onPress={() => navigation.navigate('InstructorProfile',{authorID: props.authorID})}>
                                            <Image style={styles.user_avatar} source={{
                                                uri: data.photo
                                            }} />
                                        </TouchableRipple>
                                        <View style={styles.user_name_email_field}>
                                            <Text style={[styles.user_name_txt, { color: colors.text }]}>{data.name}</Text>
                                            <View style={styles.row}>
                                                <View style={styles.section}>
                                                    <Paragraph style={[styles.paragraph, styles.caption]}>65</Paragraph>
                                                    <Paragraph style={styles.caption}>Follower</Paragraph>
                                                </View>
                                                <View style={styles.section}>
                                                    <Paragraph style={[styles.paragraph, styles.caption]}>15</Paragraph>
                                                    <Paragraph style={styles.caption}>Course</Paragraph>
                                                </View>
                                            </View>
                                        </View>
                                    </React.Fragment>
                                    )
                                }
                            }
                        }
                    </Async>
                </View>

            </View>
            <View style={[styles.content_overiew, , { backgroundColor: colors.background }]}>
                {/* What you’ll learn Part */}
                <Text style={[styles.content_title, { color: colors.text }]}>What you’ll learn</Text>
                {
                    props.outcome.map((res, index) => <View key={index} style={{ flexDirection: 'row' }}>
                        <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                        <Text style={[styles.content_description, { color: colors.text }]}>{res}</Text>
                    </View>)
                }

                {/* Requirements Part */}
                <Text style={[styles.content_title, { color: colors.text }]}>Requirements</Text>
                {
                    props.prerequisite.map((res, index) => <View key={index} style={{ flexDirection: 'row' }}>
                        <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                        <Text style={[styles.content_description, { color: colors.text }]}>{res}</Text>
                    </View>)
                }

            </View>
        </View>
    )
}


export default CxDevxCourseOverview;
