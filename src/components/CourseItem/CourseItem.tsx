import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useTheme } from '@react-navigation/native';


import { styles } from './styles';


export const CxDevxCourseItem: React.FC<any> = ({ id, price, enrolled, img, title, rating, routeToCourseDetail }: any,) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => routeToCourseDetail(id)}>
                    {
                        img === "" ? <View style={styles.img_blank}><Text style={styles.img_blank_text}>{title}</Text></View> :
                            <Image
                                testID="imgID"
                                style={styles.img}
                                source={{
                                    uri: img
                                }} />
                    }
                    <View style={styles.content_bottom}>
                        <Text testID="titleID" numberOfLines={1} style={[styles.title, { color: colors.text }]}>{title}</Text>
                        <Text style={[{ color: colors.text }, styles.price_text]}>${price}</Text>
                    </View>
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
                <Text style={{ color: colors.text, marginHorizontal: 8 }}>{rating}</Text>
                <Text style={[styles.likes, { color: colors.text, paddingRight: 5 }]}>Enrolls: {enrolled}</Text>
            </View>
        </View>

    )

}
