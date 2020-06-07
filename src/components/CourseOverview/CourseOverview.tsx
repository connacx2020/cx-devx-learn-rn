import React from 'react';
import { View, Text, Image,StyleProp,ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import { useTheme } from '@react-navigation/native';

import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';
// import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';

function CxDevxCourseOverview({ navigation }: HomeStackNavProps<"CourseOverview">) {

    const { colors } = useTheme();
    // const userInfoData = getCheckedUserInfo("");

    return (
        <View style={[styles.container,{backgroundColor:colors.background}]}>
            <View style={styles.user_overview}>
                <Text style={[styles.instructor_text,{color:colors.text}]}>Instructor</Text>
                <View style={styles.user_container}>
                    <View style={styles.user_avatar_field}>
                         <Image style={styles.user_avatar} source={{
                             uri:"https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4"
                         }}/>
                    </View>
                    <View style={styles.user_name_email_field}>
                        <Text style={[styles.user_name_txt,{color:colors.text}]}>Oak Soe Kyaw</Text>
                        <Text style={[styles.user_email_txt,{color:colors.text}]}>oaksoekyaw.coe@gmail.com</Text>
                    </View>
                </View>

                <View style={{marginTop:5,paddingHorizontal:5}}>
                    <Text style={[styles.user_about_txt,{color:colors.text}]}>
                        The CEO of Connacx LTS : Professtional in iOT
                    </Text>
                </View>
            </View>
            <View style={styles.feedback_overview}>
                <View style={styles.rate_enroll_like_field}>
                    <View style={styles.enroll_like_field}>
                        <AntdIcon name={"like2"} size={20} color={"#1E91D6"} />
                        <Text style={[styles.rating_txt,{color:colors.text}]}>1k likes</Text>
                    </View>
                    <View style={styles.enroll_like_field}>
                        <Icon name={"user"} size={20} color={"#1E91D6"} />
                        <Text style={[styles.rating_txt,{color:colors.text}]}>10k enrolled</Text>
                    </View>
                </View>
                <View style={styles.course_duration_field}>
                        <Icon name={"play"} size={25} color={"#133786"} />
                        <Text style={[styles.course_duration_txt,{color:colors.text}]}> Total 5 hours</Text>
                </View>
                <View style={styles.rating_field}>
                    <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={4.5}
                                starSize={20}
                                starStyle={styles.star as StyleProp<ViewStyle>}
                    />
                </View>
            </View>
            <View style={styles.content_overiew}>
                <Text style={[styles.content_title,{color:colors.text}]}>What will learn?</Text>
                <Text style={[styles.content_description,{color:colors.text}]}>1. Text</Text>
                <Text style={[styles.content_description,{color:colors.text}]}>2. Text</Text>
                <Text style={[styles.content_description,{color:colors.text}]}>3. Text</Text>
                <Text style={[styles.content_description,{color:colors.text}]}>4. Text</Text>
            </View>
        </View>
    )
}


export default CxDevxCourseOverview;
