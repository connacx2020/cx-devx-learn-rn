import React from 'react';
import { View, Image, StyleProp, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';
import { Course } from '../../models';

export const SearchItemCoverLeft: React.FC<any> = ({id, photoUrl, title, rating, enrolled}) => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("CourseDetail", { id: id })}>
            <View style={{ padding: 5 }}>
                <View style={styles.card_body}>
                    <View style={styles.card_cover}>
                        {photoUrl === "" ? <View style={styles.search_result_left}><Text style={styles.search_result_left_text}>{title}</Text></View> :
                            <Image
                                testID="imgID"
                                resizeMode="contain"
                                style={styles.cover_img}
                                source={{
                                    uri: photoUrl
                                }}
                            />
                        }

                    </View>
                    <View style={[styles.card_content, { backgroundColor: colors.background }]}>
                        <Title testID="titleID" style={[styles.content_title, { color: colors.text }]}>{title}</Title>
                        <Paragraph testID="enrolledID" style={[styles.content_paragraph, { color: colors.text }]}>{title} enrolled</Paragraph>
                        <View style={styles.rating_field}>
                            <StarRating
                                testID={"star"}
                                disabled={true}
                                maxStars={5}
                                rating={rating}
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
