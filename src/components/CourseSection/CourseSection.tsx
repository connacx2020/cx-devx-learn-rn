import React from 'react';
import {useEffect,useState} from 'react';
import { View, Text,Image, ScrollView,TouchableOpacity,Dimensions,TextInput } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { styles } from './style'
import { CxDevxCommentModal } from '../CommentModalBox';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { useTheme } from '@react-navigation/native'
function CxDevxCourseSection({ navigation,route}: HomeStackNavProps<"CourseSection">) {
    let [isLiked,setLike] = useState<Boolean>(false);
    let [isModalVisible,setModalVisible] = useState<Boolean>(false);
    const { colors } = useTheme();
    useEffect(()=>{
        console.log(route);
        navigation.setOptions({ title: route.params.course })
    },[route.params.course])



    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };

    return (

        <GestureRecognizer
            // onSwipeUp={() => console.log("SwipeUp")}
            // onSwipeDown={() => console.log("SwipeDown") }
            onSwipeLeft={() =>  navigation.navigate('CourseSection',{course:'What is Angular?'})}
            onSwipeRight={() => navigation.navigate('CourseSection',{course:'Introduction'}) }
            config={config}
            style={styles.wrapper}
        >
            <View style={[styles.container,{backgroundColor:colors.background}]}>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.header_avatar_lfield}>
                            <Image style={styles.avatar}
                                source={{
                                    uri:'https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4'
                                }}
                            />
                        </View>
                        <View style={styles.header_info_rfield}>
                            <Text style={[styles.info_txt,{color:colors.text}]}>Osk add new course on Angular</Text>
                            <Text style={[styles.info_time,{color:colors.text}]}>02:30 PM</Text>
                        </View>

                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.content_title,{color:colors.text}]}>{route.params.course }</Text>
                        <Text style={[styles.content_title_txt,{color:colors.text}]}>Key feature of this Angular Traning:</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - After course instructor couching benefit</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - After course computing sandbox include</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Learning Tree end of course exam included</Text>

                        <Text style={[styles.content_title_txt,{color:colors.text}]}>You will learn How To: </Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Create device independent Angular application</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Develop Component using Typscript</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Consume REST services using Obervables</Text>
                        <Text style={[styles.content_title_txt,{color:colors.text}]}>Key feature of this Angular Traning:</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - After course instructor couching benefit</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - After course computing sandbox include</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Learning Tree end of course exam included</Text>

                        <Text style={[styles.content_title_txt,{color:colors.text}]}>You will learn How To: </Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Create device independent Angular application</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Develop Component using Typscript</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Consume REST services using Obervables</Text>
                        <Text style={[styles.content_title_txt,{color:colors.text}]}>Key feature of this Angular Traning:</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - After course instructor couching benefit</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - After course computing sandbox include</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Learning Tree end of course exam included</Text>

                        <Text style={[styles.content_title_txt,{color:colors.text}]}>You will learn How To: </Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Create device independent Angular application</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Develop Component using Typscript</Text>
                        <Text style={[styles.content_txt,{color:colors.text}]}> - Consume REST services using Obervables</Text>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footer_likes_lfied}>
                        <Text style={[styles.footer_likes_txt,{color:colors.text}]}>Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footer_comments_cfield}
                        onPress={()=>setModalVisible(!isModalVisible)}
                    >
                        <Text style={[styles.footer_comments_txt,{color:colors.text}]}>Comments</Text>
                    </TouchableOpacity>
                    <View style={ styles.footer_views_rfield}>
                        <Text style={[styles.footer_views_txt,{color:colors.text}]}>1000 Views</Text>
                    </View>
                </View>
                <View>
                    <CxDevxCommentModal isLiked={isLiked} isModalVisible={isModalVisible} setLike={setLike} setModalVisible={setModalVisible}/>
                </View>
            </View>

      </GestureRecognizer>



    )
}


export default CxDevxCourseSection;
