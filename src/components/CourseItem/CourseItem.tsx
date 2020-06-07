import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useTheme } from '@react-navigation/native';


import { styles } from './styles';

type courseItem = {
    id: string,
    img: string,
    title: string,
    rate: number,
    authourID: string,
    routeToCourseDetail: any
}

export const CxDevxCourseItem = ({ id, authourID, img, title, rate, routeToCourseDetail }: courseItem) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => routeToCourseDetail(id, authourID, img, title)}>
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
                        rating={rate}
                        starSize={20}
                        starStyle={styles.star as StyleProp<ViewStyle>}
                    />
                    <Text testID="rateID" style={[styles.ratingTxt, , { color: colors.text }]}>{rate}</Text>
                </View>
                <Text testID="likeID" style={[styles.likes, , { color: colors.text }]}>{1} Enrolls</Text>
            </View>


        </View>

    )

}
