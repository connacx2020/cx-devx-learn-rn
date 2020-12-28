import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-animatable";
import { TouchableOpacity, Image, Text, ToastAndroid } from 'react-native';
import { styles } from './style';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getChildTopicsSchema, isLikedTopicSchema, likeTopicSchema, unlikeTopicSchema } from '../../common/graphQL';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign';
import { from } from 'rxjs';
import { useTheme } from '@react-navigation/native';

function CxTopicCard(props: any) {
    const { topic } = props;
    const { colors } = useTheme();
    const navigation = useNavigation();
    const userInfo: AuthUserInfo = useSelector(
        (state: any) => state.authUserInfo,
    );

    const [isTopicLiked, setLike] = React.useState(false);
    const [likeTopic] = useMutation(likeTopicSchema, { client: graphqlClient });
    const [unlikeTopic] = useMutation(unlikeTopicSchema, { client: graphqlClient });
    const isLiked = useQuery(isLikedTopicSchema, { variables: { userID: userInfo.userID, topicID: topic.id }, client: graphqlClient, notifyOnNetworkStatusChange: true });
    const getChildTopics = useQuery(getChildTopicsSchema, { variables: { parentTopicID: topic.id }, client: graphqlClient, notifyOnNetworkStatusChange: true });

    const likeButtonHandler = () => {
        isTopicLiked ?
            from(unlikeTopic({ variables: { userID: userInfo.userID, topicID: topic.id } }))
                .subscribe(
                    res => {
                        setLike(false);
                    },
                    err => {
                        console.log(err);
                    }
                ) :
            from(likeTopic({ variables: { userID: userInfo.userID, topicID: topic.id } }))
                .subscribe(
                    res => {
                        setLike(true);
                    },
                    err => {
                        console.log(err);
                    }
                );
    };

    React.useEffect(() => {
        isLiked?.data?.isTopicLikedByUser ?
            setLike(true) :
            setLike(false)
    }, [isLiked.data]);

    const handleTopicCardPress = () => {
        getChildTopics?.data?.getChildTopics.topics.length > 0 ?
            navigation.navigate("ChildTopics", { rootTopicID: topic.id, rootTitle: topic.title })
            : ToastAndroid.show(`${topic.title} has no sub-topic!`, ToastAndroid.SHORT);
    }

    return (
        <TouchableOpacity key={topic.id} onPress={handleTopicCardPress}
            style={[styles.topic_card, { backgroundColor: colors.card }]} >
            <View style={styles.topic_card_header}>
                {
                    topic.logo ?
                        <Image
                            style={styles.img}
                            source={{ uri: topic.logo }} />
                        : <View style={{ backgroundColor: '#C0C1C2', width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{fontSize: 20, letterSpacing: 1.5, textAlign: 'center', fontWeight: 'normal', color: '#6C6C6D'}}>{topic.title}</Text></View>
                }
            </View>
            <View style={styles.topic_card_footer}>

                <Text style={[styles.topic_card_title_txt, { color: colors.text }]} numberOfLines={1}>
                    {topic.title}
                </Text>

                <Text style={[styles.topic_card_desc_txt, { color: colors.text }]} numberOfLines={1}>
                    {topic.description}
                </Text>

                {

                    <TouchableOpacity style={styles.heard_icon}
                        onPress={likeButtonHandler}
                    >
                        <Text style={{ color: colors.text }}>
                            <Icon
                                name={'like1'}
                                size={16}
                                color={!isTopicLiked ? colors.text : colors.primary}
                            />
                            {!isTopicLiked ? ' Like' : ' Unlike'}
                        </Text>

                    </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    )
}

export default CxTopicCard;