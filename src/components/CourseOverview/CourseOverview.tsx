import React from 'react';
import { View, Text, Image, StyleProp, ViewStyle, TouchableOpacity, ActivityIndicator } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { useTheme,useNavigation } from '@react-navigation/native';
import { TouchableRipple, Paragraph, Divider, useTheme as PaperTheme } from 'react-native-paper';
import ViewMoreText from 'react-native-view-more-text';
import { Query } from '@apollo/react-components';

import { getUserInfoByIdSchema } from '../../common/graphQL';

import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';
// import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';

function CxDevxCourseOverview({ authourID }: HomeStackNavProps<"CourseOverview">) {
    const paperTheme = PaperTheme();
    const { colors } = useTheme();
    console.log(authourID)

    const navigation = useNavigation();
    // const userInfoData = getCheckedUserInfo("");

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
                            rating={4.5}
                            starSize={17}
                            starStyle={styles.star as StyleProp<ViewStyle>}
                        />
                    </View>
                </View>
                <Divider />
                <View style={styles.cinfo_row}>
                    <Text style={[styles.cinfo_title, , { color: colors.text }]}>Enroll</Text>
                    <Text style={[styles.cinfo_value_txt, { color: colors.text }]}><MCIcon name="file-document-edit-outline" size={16} color={!paperTheme.dark ? "#333" : '#fff'} />  123</Text>
                </View>
                <Divider />
                <View style={styles.cinfo_row}>
                    <Text style={[styles.cinfo_title, { color: colors.text }]}>Duration</Text>
                    <Text style={[styles.cinfo_value_txt, { color: colors.text }]}>22h 43m  <IonicIcon name="md-time" size={16} color={!paperTheme.dark ? "#333" : '#fff'} /></Text>
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
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut enim voluptas natus consequuntur dicta placeat quisquam? Sit dolorem ab sint veniam, quas tempora perferendis eum numquam nihil aspernatur error deleniti.
                        </Text>
                    </ViewMoreText>
                </View>
            </View>
            <View style={[styles.user_overview, { backgroundColor: colors.background }]}>


                <Query<any, any>  query={getUserInfoByIdSchema} variables={{ userID: authourID  }}>
                    {
                        ({ loading, error, data }) => {

                            if (error) console.log(error)
                            // console.log(data);

                            if (loading) return <View style={{ alignSelf: 'center' }} >
                                <View>
                                    <ActivityIndicator size="large" />
                                </View>
                            </View>
                            return (
                                <View style={styles.user_container}>
                                    <TouchableRipple style={styles.user_avatar_field} onPress={() => navigation.navigate('InstructorProfile',{authourId:authourID})}>
                                        <Image style={styles.user_avatar} source={{
                                            uri: "https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4"
                                        }} />
                                    </TouchableRipple>
                                    <View style={styles.user_name_email_field}>
                                        <Text style={[styles.user_name_txt, { color: colors.text }]}>Oak Soe Kyaw</Text>
                                        <View style={styles.row}>
                                            <View style={styles.section}>
                                                <Paragraph style={[styles.paragraph, styles.caption]}>65</Paragraph>
                                                <Paragraph style={styles.caption}>Follower</Paragraph>
                                            </View>
                                            <View style={styles.section}>
                                                <Paragraph style={[styles.paragraph, styles.caption]}>15</Paragraph>
                                                <Paragraph style={styles.caption}>Courses</Paragraph>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    }
                </Query>


            </View>
            <View style={[styles.content_overiew, , { backgroundColor: colors.background }]}>
                {/* What you’ll learn Part */}
                <Text style={[styles.content_title, { color: colors.text }]}>What you’ll learn</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>Create real-world native apps using React Native</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>Make truly reusable components that look great</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>Understand the terminology and concepts of Redux</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>Prototype and deploy your own applications to the Apple and Google Play Stores</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>Get up to speed with React design principles and methodologies</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>Discover mobile design patterns used by experienced engineers</Text>
                </View>
                {/* Requirements Part */}
                <Text style={[styles.content_title, { color: colors.text }]}>Requirements</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.content_description, { color: colors.text }]}>{'\u2B24'}</Text>
                    <Text style={[styles.content_description, { color: colors.text }]}>All you need is basic understanding of Javascript</Text>
                </View>

            </View>
        </View>
    )
}


export default CxDevxCourseOverview;
