import React, { useEffect, useState } from 'react';
import { View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import {styles} from './style';
import {CourseDetailTabs} from '../../Tabs/CourseDetailTabs';


export function CxDevxCourseDetail({ navigation,route }: HomeStackNavProps<"CourseDetail">){
    const {image,title} = route.params;
    const tabNavigation = useNavigation();
    const parent = tabNavigation.dangerouslyGetParent();
    let [isLiked,setLike] = useState<Boolean>(false);
    useEffect(()=>{
        parent?.setOptions({tabBarVisible: false});
    },[1]);
    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                     style={styles.header_course_img}
                    source={{
                        uri:image
                    }}
                />
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={styles.header_left_arrow}
                >
                        <FeatherIcon name={"arrow-left"} size={30} color={"#2541B2"} />
                </TouchableOpacity>
                <Text style={styles.header_title}>{title}</Text>
                <TouchableOpacity style={styles.header_btn}>
                    <Text style={styles.header_btn_txt}> Enroll this course</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer_tabs}>
                <CourseDetailTabs/>
            </View>

        </ScrollView>
    )
}
