import React from 'react';
import { StyleSheet, View, Text ,TouchableOpacity,SafeAreaView,FlatList} from 'react-native';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import { styles } from './style';

function CxDevxCourseContent({ navigation }: HomeStackNavProps<"CourseContent">) {

    const courseData = [
        {title:"Introduction"},
        {title: "What is Angular?"},
        {title: "Setup"},
        {title:"Course curriculum"},
        {title: "Why use Angular?"},
        {title: "Typescript with Angular"},
        {title: "Creact Angular Project"},
        {title: "Hello Wordl"}
    ]
    const RenderCourseItem = ({index,title})=>{
        return(
            <TouchableOpacity style={styles.render_course_item_container}onPress={()=>navigation.navigate('CourseSection',{course:title})}>
                <Text style={styles.render_course_item_txt}>{index+1}. {title} </Text>
             </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                <FlatList
                data={courseData}
                renderItem={({ item,index }) => <RenderCourseItem index={index} title={item.title} />}
                keyExtractor={item => item.title}
              />
            }

        </SafeAreaView>
    )
}
export default CxDevxCourseContent;
