import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-animatable";
import { TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { styles } from './style';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { isLikedTopicSchema, likeTopicSchema, unlikeTopicSchema } from '../../common/graphQL';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
import { from } from 'rxjs';
import { Query } from '@apollo/react-components';

function CxTopicCard(props: any) {
    const { topic } = props;
    const navigation = useNavigation();
    const ScreenWidth = Dimensions.get('window').width;
    const numColumns = 2;
    const userInfo: AuthUserInfo = useSelector(
        (state: any) => state.authUserInfo,
    );

    const [isTopicLiked, setLike] = React.useState(false);
    const [likeTopic] = useMutation(likeTopicSchema, { client: graphqlClient });
    const [unlikeTopic] = useMutation(unlikeTopicSchema, { client: graphqlClient });
    const isLiked = useQuery(isLikedTopicSchema, { variables: { userID: userInfo.userID, topicID: topic.id }, client: graphqlClient, notifyOnNetworkStatusChange: true })

    const likeButtonHandler = () => {
        from(likeTopic({ variables: { userID: userInfo.userID, topicID: topic.id } }))
            .subscribe(
                res => {
                    setLike(true);
                },
                err => {
                    console.log(err);
                }
            )
    }
    const unlikeButtonHandler = () => {
        from(unlikeTopic({ variables: { userID: userInfo.userID, topicID: topic.id } }))
            .subscribe(
                res => {
                    setLike(false);
                },
                err => {
                    console.log(err);
                }
            )
    }

React.useEffect(() => {
    isLiked.data && isLiked.data.isTopicLikedByUser ?
        setLike(true) :
        setLike(false)
}, [isLiked.data])

return (
    <TouchableOpacity key={topic.id} onPress={() => {
        navigation.navigate("ChildTopics", { rootTopicID: topic.id, rootTitle: topic.title })
    }
    } style={[styles.topic_card, { width: (ScreenWidth / numColumns) - 20, height: (ScreenWidth / numColumns) + 5 }]} >

        <View style={styles.topic_card_header}>
            <Image
                style={styles.img}
                source={{
                    uri: topic.logo
                }}
            />
        </View>

        <View style={styles.topic_card_footer}>

            <Text style={styles.topic_card_title_txt}>
                {topic.title}
            </Text>

            <Text style={styles.topic_card_desc_txt}>
                {topic.description}
            </Text>

            {
                !isTopicLiked ?
                    <TouchableOpacity style={styles.heard_icon}
                        onPress={likeButtonHandler}
                    >
                        <Text>
                            <Icon
                                name={'like2'}
                                size={20}
                                color={'#7C7879'}
                            />
                                Like
                            </Text>

                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.heard_icon}
                        onPress={unlikeButtonHandler}
                    >
                        <Text>
                            <Icon
                                name={'like1'}
                                size={20}
                                color={"#1E91D6"}
                            />
                                Unlike
                            </Text>

                    </TouchableOpacity>
            }
        </View>
    </TouchableOpacity>
)
}

export default CxTopicCard;