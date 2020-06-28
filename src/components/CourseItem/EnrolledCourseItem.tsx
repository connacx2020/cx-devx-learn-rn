import React from 'react';
import { View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useTheme } from '@react-navigation/native';


import { styles } from './styles';
import { Course } from '../../models';


export const CxDevxEntrolledCourseItem: React.FC<any> = ({ id, authorID, enrolled, img, title, rating, description }: any,) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <View>
                    {
                        img === "" ? <View style={styles.img_blank}><Text numberOfLines={2} style={styles.img_blank_text}>{title}</Text></View> :
                            <Image
                                testID="imgID"
                                style={styles.img}
                                source={{
                                    uri: img
                                }} />
                    }
                    <View style={styles.content_bottom}>
                        <Text testID="titleID" numberOfLines={1} style={[styles.title, { color: colors.text, alignSelf: 'flex-start' }]}>{title}</Text>
                    </View>
                </View>
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
                <Text style={{ color: colors.text, marginHorizontal: 8 }}>{rating}</Text>
                <Text style={[styles.likes, { color: colors.text, paddingRight: 5 }]}>Enrolls: {enrolled}</Text>
            </View>


        </View>

    )

}
