import React from 'react';
import { TouchableOpacity,View,Text,Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {styles} from './styles';


const CxDevxPost : React.FC = ()=>{
    return(
        <View style={styles.card}>
            <View style={styles.card_header}>
                <Image
                    style={styles.header_img}
                    source={{
                        uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSx0EzoECUE80nn6aFV7Wc_HHhR6W_eLNaDqWa5NaRnoBPa59GN&usqp=CAU'
                    }}
                />
                <View style={styles.header_txt}>
                <Text style={styles.head_post_txt}>GraphQl Tutorial</Text>
                <Text style={styles.header_time_txt}>2:50 PM</Text>
                </View>
            </View>
            <View style={styles.card_content}>
                <Image style={styles.card_content_img}
                source={{
                    uri: 'https://miro.medium.com/max/4000/1*feOd6UwyHF71rRmRtj_B7g.png',
                  }}
                />
            </View>
            <View style={styles.card_footer}>
                <Text style={styles.like}>
                {/* <Icon style={styles.icon} name={"like"} size={35} color="#333" /> */}
                    Like
                </Text>
                <Text style={styles.comment}>Comment</Text>
                <Text style={styles.view}>View</Text>
            </View>

        </View>
    )
}
export default CxDevxPost;
