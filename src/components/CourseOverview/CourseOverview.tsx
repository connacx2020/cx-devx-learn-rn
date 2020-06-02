import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntdIcon from 'react-native-vector-icons/AntDesign';

import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';

function CxDevxCourseOverview({ navigation }: HomeStackNavProps<"CourseOverview">) {

    return (
        <View style={styles.container}>
            <View style={styles.user_overview}>
                <Text style={styles.instructor_text}>Instructor</Text>
                <View style={styles.user_container}>
                    <View style={styles.user_avatar_field}>
                         <Image style={styles.user_avatar} source={{
                             uri:"https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4"
                         }}/>
                    </View>
                    <View style={styles.user_name_email_field}>
                        <Text style={styles.user_name_txt}>Oak Soe Kyaw</Text>
                        <Text style={styles.user_email_txt}>oaksoekyaw.coe@gmail.com</Text>
                    </View>

                </View>
            </View>
            <View style={styles.feedback_overview}>
                <View style={styles.rate_enroll_like_field}>
                    <View style={styles.rating_field}>
                        <Icon  style={styles.rating_star} name={"star"} size={25} color={"#FFD700"} />
                         <Text style={styles.rating_txt}>4.5</Text>
                    </View>
                    <View style={styles.enroll_like_field}>
                         <Icon name={"user"} size={25} color={"#333"} />
                         <Text style={styles.rating_txt}>10k enrolled</Text>
                    </View>
                    <View style={styles.enroll_like_field}>
                         <AntdIcon name={"like2"} size={25} color={"#1E91D6"} />
                         <Text style={styles.rating_txt}>1k likes</Text>
                    </View>
                </View>
                <View style={styles.course_duration_field}>
                        <Icon name={"play"} size={30} color={"#133786"} />
                        <Text style={styles.course_duration_txt}> Total 5 hours</Text>
                </View>

            </View>
            <View style={styles.content_overiew}>
                <Text style={styles.content_title}>What will learn?</Text>
                <Text style={styles.content_description}>1. Text</Text>
                <Text style={styles.content_description}>2. Text</Text>
                <Text style={styles.content_description}>3. Text</Text>
                <Text style={styles.content_description}>4. Text</Text>

            </View>
        </View>
    )
}


export default CxDevxCourseOverview;
