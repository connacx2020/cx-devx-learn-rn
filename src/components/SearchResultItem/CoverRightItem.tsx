import React from 'react';
import { View, Image, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { useNavigation,useTheme } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Card, Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';

type courseItem = {
    img: string,
    title: string,
    rate: number,
    likes: number,
    enrolled: number
}

export const SearchItemCoverRight: React.FC<courseItem> = ({ img, title, rate, likes, enrolled }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const routeToCourseDetail = (img: string, title: string) => {
        navigation.navigate("CourseDetail", { image: img, title: title });
    }
    return (
        <TouchableOpacity onPress={() => routeToCourseDetail(img, title)}>
            <Card>
                <Card.Content>
                    <View style={styles.card_body}>
                        
                        <View style={[styles.card_content,{backgroundColor:colors.background}]}>
                            <Title style={[styles.content_title,{color:colors.text}]}>{title}</Title>
                            <Paragraph style={[styles.content_paragraph,{color:colors.text}]}>{likes} likes</Paragraph>
                            <Paragraph style={[styles.content_paragraph,{color:colors.text}]}>{enrolled} enrolled</Paragraph>
                            <StarRating
                                testID={"star"}
                                disabled={true}
                                maxStars={5}
                                rating={rate}
                                starSize={16}
                                starStyle={styles.rating_star as StyleProp<ViewStyle>}
                            />
                        </View>
                        <View style={styles.card_cover}>
                            <Image
                                style={styles.cover_img}
                                source={{
                                    uri: img
                                }}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}