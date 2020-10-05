import React from 'react';
import { View, Image, StyleProp, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';

export const SearchItemCoverLeft: React.FC<any> = ({ id, photoUrl, title, rating, enrolled, price }) => {
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
                        <Title testID="titleID" numberOfLines={1} style={[styles.content_title, { color: colors.text }]}>{title}</Title>
                        <Paragraph testID="enrolledID" numberOfLines={1} style={[styles.content_paragraph, { color: colors.text }]}>{title}</Paragraph>

                        <View style={styles.search_result_bottom}>

                            <View style={styles.rating_field}>
                                <StarRating
                                    testID={"star"}
                                    disabled={true}
                                    maxStars={5}
                                    rating={rating}
                                    starSize={17}
                                    starStyle={styles.rating_star as StyleProp<ViewStyle>}
                                />
                                <Text style={{ color: colors.text, paddingHorizontal: 8, paddingTop:4.5, alignSelf: 'center' }}>{rating}</Text>
                            </View>

                            <View style={{ alignSelf: 'flex-end' }}>
                                <Text style={{ color: colors.text, fontWeight: "normal" }}>Price: {price}$</Text>
                            </View>

                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
