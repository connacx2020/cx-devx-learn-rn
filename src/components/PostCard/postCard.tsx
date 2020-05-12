import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import { postCardStyle as styles } from './styles';
import { useQuery } from '@apollo/react-hooks';
import { getPostByIDSchema } from '../../common/graphQL';
import { Post } from '../../models/post.model';

interface PostID {
    postID: string
}

const CxDevxPost: React.FC<PostID> = (props: PostID) => {

    const postID = props.postID;

    const [postData, setPostData] = React.useState<Post>({} as Post);
    const fetchPost = useQuery(getPostByIDSchema, { variables: { postID: postID }, notifyOnNetworkStatusChange: true });

    React.useEffect(() => {
        if (fetchPost.data) {
            setPostData(fetchPost.data.searchPostByID);
        }
    }, [postData]);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image style={styles.img}
                    source={{
                        uri: 'https://miro.medium.com/max/4000/1*feOd6UwyHF71rRmRtj_B7g.png',
                    }}
                />
                <View style={styles.content}>
                    <Text style={styles.content_title}>{postData.title === "" ? 'Graphql course': postData.title}</Text>
                    <View style={styles.content_bottom}>
                        <View style={styles.content_footer}>
                            <View>
                                <Icon name={"like"} size={25} color="#545454" />
                            </View>
                            <Text>
                                {postData.likes} likes
                            </Text>
                        </View>
                        <View style={styles.content_footer}>
                            <View>
                                <Icon name={"eye"} size={25} color="#333" />
                            </View>
                            <Text>
                                {postData.views} Views
                    </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default CxDevxPost;
