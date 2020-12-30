import React, { useEffect, useState } from 'react';
import { View, Image, StyleProp, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';

export const SearchItemCoverLeft: React.FC<any> = (props: any) => {
    const { searchFor, searchResult } = props;
    const { id, rating, price } = searchResult;
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleOnPressItem = () => {
        const cases: any = {
            'post': () => {
                navigation.navigate("PostDetail", { postData: searchResult, postID: searchResult.id });
            },
            'course': () => {
                navigation.navigate("CourseDetail", { id: id })
            },
            'topic': () => {
                console.log("Pressed: ", title);
            }
        }
        if (cases[searchFor]) {
            cases[searchFor]();
        }
    }

    useEffect(() => {
        const cases: any = {
            'post': () => {
                setPhotoUrl('');
                searchResult.title.length > 0 ? setTitle(searchResult.title) : setTitle('No Title')
                setSubtitle(searchResult.category)
            },
            'course': () => {
                // navigation.navigate("CourseDetail", { id: id })
            },
            'topic': () => {            }
        };
        if (cases[searchFor]) {
            cases[searchFor]();
        }
    })

    return (
        <TouchableOpacity onPress={handleOnPressItem} style={[styles.cardContainer, { backgroundColor: colors.card }]}>
            <View>
                <View style={styles.card_body}>
                    <View style={[styles.card_cover, { backgroundColor: colors.background }]}>
                        {
                            !photoUrl || photoUrl === "" ?
                                <View style={styles.imageView}>
                                    <Text style={[styles.imageText, { color: colors.text }]}>{searchResult.title}</Text>
                                </View> :
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
                    <View style={[styles.card_content, { backgroundColor: colors.card }]}>
                        <Title testID="titleID" numberOfLines={1} style={[styles.content_title, { color: colors.text }]}>{title}</Title>
                        <Paragraph testID="enrolledID" numberOfLines={1} style={[styles.content_paragraph, { color: colors.text }]}>{subtitle}</Paragraph>
                        {
                            searchFor === 'course' &&
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
                                    <Text style={{ color: colors.text, paddingHorizontal: 8, paddingTop: 4.5, alignSelf: 'center' }}>{rating}</Text>
                                </View>

                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ color: colors.text, fontWeight: "normal" }}>Price: {price}$</Text>
                                </View>

                            </View>
                        }

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
