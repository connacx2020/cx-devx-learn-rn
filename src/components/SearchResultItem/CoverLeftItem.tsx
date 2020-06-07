import React from 'react';
import { View, Image, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { useNavigation,useTheme } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';

type courseItem = {
    img: string,
    title: string,
    rate: number,
    likes: number,
    enrolled: number
}

export const SearchItemCoverLeft: React.FC<courseItem> = ({ img, title, rate, likes, enrolled }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const routeToCourseDetail = (img: string, title: string) => {
        navigation.navigate("CourseDetail", { image: img, title: title });
    }
    return (
        <TouchableOpacity onPress={() => routeToCourseDetail(img, title)}>
            <View style={{padding:5}}>
                    <View style={styles.card_body}>
                        <View style={styles.card_cover}>
                            <Image
                                testID="imgID"
                                style={styles.cover_img}
                                source={{
                                    uri: img
                                }}
                            />
                        </View>
                        <View style={[styles.card_content,{backgroundColor:colors.background}]}>
                            <Title testID="titleID" style={[styles.content_title,{color:colors.text}]}>{title}</Title>
                            <Paragraph testID="likeID" style={[styles.content_paragraph,{color:colors.text}]}>{likes} likes</Paragraph>
                            <Paragraph testID="enrolledID" style={[styles.content_paragraph,{color:colors.text}]}>{enrolled} enrolled</Paragraph>
                            <View style={styles.rating_field}>
                                <StarRating
                                    testID={"star"}
                                    disabled={true}
                                    maxStars={5}
                                    rating={rate}
                                    starSize={15}
                                    starStyle={styles.rating_star as StyleProp<ViewStyle>}
                                />
                            </View>
                        </View>
                    </View>
            </View>
        </TouchableOpacity>
    )
}