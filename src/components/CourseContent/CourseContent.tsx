import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { useTheme, useNavigation } from '@react-navigation/native';
import { getPostSeriesByIdSchema } from '../../common/graphQL';
import { Query } from '@apollo/react-components';
import { Course } from '../../models';
import { Divider } from 'react-native-paper';
const CxDevxCourseContent: React.FC<any> = (props: Course) => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const RenderCourseItem = ({ index, title, postID, postSeries }) => {
        // console.log(title,postID,postSeries)
        return (
            <View>
                <TouchableOpacity style={styles.render_course_item_container} onPress={() => navigation.navigate('CourseSection', { course: title, postID, postSeries })}>
                    <Text style={[styles.render_course_item_txt, { color: colors.text }]}>{index + 1}. {title} </Text>
                </TouchableOpacity>
                <Divider />
            </View>
        )
    }
    return (
        <View>
            <Query<any, any> query={getPostSeriesByIdSchema} variables={{ seriesID: props.seriesID }}>
                {
                    ({ loading, error, data }) => {
                        console.log(data.getPostSeries.posts)
                        if (loading) return <Text>Loading...</Text>
                        if (error) return <Text>Error</Text>

                        return data.getPostSeries.posts.map((res: any, index: any) => <RenderCourseItem key={index} postSeries={data.getPostSeries.posts} index={index} postID={res.id} title={res.title} />)
                    }
                }
            </Query>
        </View>
    )
}
export default CxDevxCourseContent;
