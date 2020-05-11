import React from 'react';
import { StyleSheet, View, Text, Image, ToastAndroid } from 'react-native';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';

import { AuthNavProps } from '../../common/ultis/ParamLists/AuthParamList';
import { Post } from '../../models/post.model';
import { getPostByIDSchema } from '../../common/graphQL';
import { useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/EvilIcons';



function CxDevxDetail({ route, navigation }: HomeStackNavProps<"PostDetail">) {

    const { postID } = route.params;
    const [postData, setPostData] = React.useState<Post>({} as Post);
    const fetchPost = useQuery(getPostByIDSchema, { variables: { postID }, notifyOnNetworkStatusChange: true });

    React.useEffect(() => {
        if (fetchPost.data) {
            setPostData(fetchPost.data.searchPostByID);
        }
    }, [postData]);



    return (
        <View style={styles.body}>
            <Image style={styles.img}
                source={{
                    uri: 'https://miro.medium.com/max/4000/1*feOd6UwyHF71rRmRtj_B7g.png',
                }}
            />
            <View style={styles.tab_bar}>
                <Icon onPress={() => ToastAndroid.show('hi', ToastAndroid.SHORT)} name={"like"} size={45} color="#333" />
            </View>
            <Text style={styles.title_text}>
                {/* {postData.title} */}
                Title
            </Text>
            <Text style={styles.description}>
                {postData.content}
            </Text>
            <Text>
                {JSON.stringify(postData.comments)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        padding: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    description: {
        fontSize: 18
    },
    img: {
        height: 200,
        resizeMode: 'stretch'
    },
    tab_bar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10
    }

});

export default CxDevxDetail;
