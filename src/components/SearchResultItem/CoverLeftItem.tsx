import React, { useEffect, useState } from 'react';
import { View, Image, StyleProp, ViewStyle, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Title, Paragraph } from 'react-native-paper';
import { styles } from './styles';
import { useQuery } from '@apollo/react-hooks';
import { getChildTopicsSchema, graphqlClient } from '../../common/graphQL';

export const SearchItemCoverLeft: React.FC<any> = (props: any) => {
    const { searchFor, searchResult } = props;
    const { id, rating, price } = searchResult;
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const navigation = useNavigation();
    const { colors } = useTheme();
    const getChildTopicsQuery = useQuery(getChildTopicsSchema, { variables: { parentTopicID: id }, client: graphqlClient, notifyOnNetworkStatusChange: true });

    const handleOnPressItem = () => {
        const cases: any = {
            'post': () => {
                navigation.navigate("PostDetail", { postData: searchResult, postID: searchResult.id });
            },
            'course': () => {
                navigation.navigate("CourseDetail", { id: id })
            },
            'topic': () => {
                getChildTopicsQuery?.data?.getChildTopics.topics.length > 0 ?
                    navigation.navigate("ChildTopics", { rootTopicID: id, rootTitle: title })
                    : ToastAndroid.show(`${title} has no sub-topic!`, ToastAndroid.SHORT);
            }
        };
        if (cases[searchFor]) {
            cases[searchFor]();
        }
    }

    useEffect(() => {
        const cases: any = {
            'post': () => {
                setPhotoUrl('');
                searchResult.title.length > 0 ? setTitle(searchResult.title) : setTitle('No Title')
                setSubtitle(searchResult.category);
            },
            'course': () => {
                setTitle(searchResult.title);
                setPhotoUrl(searchResult.photoUrl);
                setSubtitle(searchResult.description);
            },
            'topic': () => {
                setPhotoUrl(searchResult.logo);
                setTitle(searchResult.title);
                setSubtitle(searchResult.description);
            }
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
                                    <Text style={[styles.imageText, { color: colors.text }]}>{title}</Text>
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
