import React from 'react';
import { TouchableOpacity, View, Text, Image ,StyleProp,ViewStyle} from 'react-native';
import StarRating from 'react-native-star-rating';
import { useTheme } from '@react-navigation/native';


import { styles } from './styles';

type courseItem = {
    img: string,
    title: string,
    rate: number,
    likes : number,
    routeToCourseDetail : ()=>void
}

export function CxDevxCourseItem({ img,title,rate,likes,routeToCourseDetail }: courseItem) {
    const { colors } = useTheme();
    return(
        <View style={[styles.container,{backgroundColor:colors.background}]}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={()=>routeToCourseDetail(img,title)}>
                    <Image
                        testID="imgID"
                        style={styles.img}
                        source={{
                            uri: img
                        }}/>
                    <Text testID="titleID" style={[styles.title,{color:colors.text}]}>{title}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <View style={styles.ratingContainer} >
                        <StarRating
                            testID={"star"}
                            disabled={true}
                            maxStars={5}
                            rating={rate}
                            starSize={20}
                            starStyle={styles.star as StyleProp<ViewStyle>}
                        />
                        <Text testID="rateID" style={[styles.ratingTxt,,{color:colors.text}]}>{rate}</Text>
                    </View>
                    <Text testID="likeID" style={[styles.likes,,{color:colors.text}]}>{likes} Likes</Text>
                </View>


        </View>

    )

}
