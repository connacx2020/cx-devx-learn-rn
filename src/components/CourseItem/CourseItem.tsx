import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useTheme } from '@react-navigation/native';

import { styles } from './styles';
import { Course } from '../../models';


export const CxDevxCourseItem:React.FC<any> = ({id, authorID, enrolled, img, title, rating, description, routeToCourseDetail}: any, ) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => routeToCourseDetail(id)}>
                    {
                        img === "" ? <View  style={{height: 150, display:'flex',flexDirection:'column',justifyContent:'center', backgroundColor:'#2289f0'}}><Text style={{alignSelf:'center', fontWeight:'bold', fontSize: 30, color:'white'}}>{title}</Text></View> :
                        <Image
                            testID="imgID"
                            style={styles.img}
                            source={{
                                uri: img
                            }} />
                    }
                    <Text testID="titleID" style={[styles.title, { color: colors.text }]}>{title}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <View style={styles.ratingContainer} >
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={rating}
                        starSize={20}
                        starStyle={styles.star as StyleProp<ViewStyle>}
                    />
                </View>
                <Text style={[styles.likes, { color: colors.text }]}>{enrolled} Enrolls</Text>
            </View>


        </View>

    )

}
