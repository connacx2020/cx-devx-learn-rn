import React from 'react';
import { TouchableOpacity, View, Text, Image ,StyleProp,ViewStyle} from 'react-native';
import StarRating from 'react-native-star-rating';

import { styles } from './styles';

type courseItem = {
    img: string,
    title: string,
    rate: number,
    likes : number
    starStyle: StyleProp<ViewStyle>
}

export function CxDevxCourseItem({ img,title,rate,likes }: courseItem) {
    return(
        <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: img
                        }}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.ratingContainer}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={rate}
                            starSize={20}
                            starStyle={styles.star}
                        />
                        <Text style={styles.ratingTxt}>{rate}</Text>
                    </View>
                    <Text style={styles.likes}>{likes} Likes</Text>
                </View>

        </View>

    )

}
