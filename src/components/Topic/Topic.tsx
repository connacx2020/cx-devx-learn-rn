import React from 'react';
import { View, Text, ScrollView, ToastAndroid, BackHandler, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Topic } from '../../models';
import { getAllTopicsSchema, isLikedTopicSchema, likeTopicSchema, unlikeTopicSchema, getChildTopicsSchema } from '../../common/graphQL';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { ActivityIndicator, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from './style';
import { Divider } from 'react-native-paper';
import { TopicParamList } from '../../common/ultis/ParamLists/TopicParamList';

function CxDevxTopic() {
    const { colors } = useTheme();
    const ScreenWith = Dimensions.get('window').width;
    const numColumns = 2;
    const navigation = useNavigation();
    const userInfo: AuthUserInfo = useSelector(
        (state: any) => state.authUserInfo,
    );
    const [likeHandler] = useMutation(likeTopicSchema, { client: graphqlClient });
    const [unlikeHandler] = useMutation(unlikeTopicSchema, {
        client: graphqlClient,
    });


    let [isParent, setParent] = React.useState(true);

    const [fetchChildTopics, childTopics] = useLazyQuery(getChildTopicsSchema, { client: graphqlClient, onCompleted: (res) => console.log(res) });

    const formatData = (dataList: number, numColumns: number) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - totalRows * numColumns;

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    const dummyTopics: Topic[] = [
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "Python", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "NodeJS", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "React", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "React Native", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "Angular", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "NestJS", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "GraphQL", parentTopic: "" },
    ]

    const childDummyTopics: Topic[] = [
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "Rust", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "GO", parentTopic: "" },
        { contexts: [], description: "", id: "", likes: 0, logo: "", title: "Dart", parentTopic: "" },
    ]

    const backAction = () => {
        if (isParent) {
            navigation.goBack();
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        } else {
            setParent(true)
        }
        return true
    };


    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [isParent]);

    const renderCardItem = ({ item }) => {
        if (item.empty) {
            return (
                <View
                    style={[
                        styles.topic_card,
                        { backgroundColor: 'transparent', elevation: 0, width: (ScreenWith / numColumns) - 20, height: (ScreenWith / numColumns) + 5 },
                    ]}
                />
            );
        }

        return (
            <TouchableOpacity onPress={() => { setParent(false); console.log("97 ---->", isParent) }} style={[styles.topic_card, { width: (ScreenWith / numColumns) - 20, height: (ScreenWith / numColumns) + 5 }]}>

                <View style={styles.topic_card_header}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: item.logo,
                        }}
                    />
                </View>

                <View style={styles.topic_card_footer}>

                    <Text style={styles.topic_card_title_txt}>
                        {item.title}
                    </Text>

                    <Text style={styles.topic_card_desc_txt}>
                        {item.description}
                    </Text>

                    {/* <Query<any, any> query={isLikedTopicSchema} client={graphqlClient} variables={{ userID: userInfo.userID, topicID: item.id }}>
                        {(isLikedTopicData) => {

                            if (isLikedTopicData.error)
                                console.log(isLikedTopicData.error);

                            if (isLikedTopicData.loading)
                                return (
                                    <View style={{ alignSelf: 'center' }}>
                                        <View>
                                            <ActivityIndicator size="large" />
                                        </View>
                                    </View>
                                );

                            if (!isLikedTopicData.data.isLikedTopic) {
                                return (
                                    <TouchableOpacity style={styles.heard_icon}
                                        onPress={() => likeHandler({
                                            variables: { userID: userInfo.userID, topicID: item.id },
                                            refetchQueries: [{ query: isLikedTopicSchema, variables: { userID: userInfo.userID, topicID: item.id } }]
                                        })}
                                    >
                                        <Text>
                                            <Icon
                                                name={'like2'}
                                                size={20}
                                                color={'#7C7879'}
                                            />
                                              Like
                                        </Text>

                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <TouchableOpacity style={styles.heard_icon}
                                        onPress={() => unlikeHandler({
                                            variables: { userID: userInfo.userID, topicID: item.id },
                                            refetchQueries: [{ query: isLikedTopicSchema, variables: { userID: userInfo.userID, topicID: item.id } }]
                                        })}
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
                                );
                            }
                        }}
                    </Query> */}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.body}>
            {/* <Query<any, any> query={getAllTopicsSchema}>
                {
                    (getAllTopics) => {
                        if (getAllTopics.error)
                            ToastAndroid.show('No Internet Connection ', ToastAndroid.SHORT);

                        if (getAllTopics.loading)
                            return <Text>Loading......</Text>


                        if (getAllTopics.data) {
                            return <FlatList
                                // data={formatData(getAllTopics.data.findAllTopic, numColumns)}
                                data={formatData(dummyTopics, numColumns)}
                                renderItem={renderCardItem}
                                keyExtractor={(index) => index.toString()}
                                numColumns={numColumns}
                            />
                        } else {
                            return <Text>No Internet Connection!</Text>
                        }

                    }
                }
            </Query> */}
            <FlatList
                // data={formatData(getAllTopics.data.findAllTopic, numColumns)}
                data={formatData(isParent ? dummyTopics : childDummyTopics, numColumns)}
                renderItem={renderCardItem}
                keyExtractor={(index) => index.toString()}
                numColumns={numColumns}
            />
        </ScrollView>
    );
}
export default CxDevxTopic;
