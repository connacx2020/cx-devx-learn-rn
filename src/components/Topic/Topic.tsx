import React from 'react';
import { View, Text, ScrollView, ToastAndroid, FlatList } from 'react-native';
import { Topic } from '../../models';
import { isLikedTopicSchema, likeTopicSchema, unlikeTopicSchema, getChildTopicsSchema, getRootTopicsSchema, findTopicByIDSchema } from '../../common/graphQL';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { ActivityIndicator, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from './style';

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
    let [childTopicsData, setChildTopics] = React.useState([]);

    const [fetchChildTopics, childTopics] = useLazyQuery(getChildTopicsSchema, { client: graphqlClient, onCompleted: (data) => setChildTopics(data.getAllChildTopics) });

    const formatData = (dataList: number, numColumns: number) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - totalRows * numColumns;

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    React.useEffect(() => {
    }, [isParent]);

    const renderCardItem = (topicInfo: any) => {
        if (topicInfo.item.empty) {
            return (
                <View
                    style={[
                        styles.topic_card,
                        { backgroundColor: 'transparent', elevation: 0, width: (ScreenWith / numColumns) - 20, height: (ScreenWith / numColumns) + 5 },
                    ]}
                />
            );
        } else {
            return getTopicDetail(topicInfo.item)
        }
    }

    const getTopicDetail = (topicID: string) => <Query<any, any> query={findTopicByIDSchema} variables={{ topicID }}>
        {(getByTopicID) => {
            if (getByTopicID.loading) return <Text>Loading....</Text>
            if (getByTopicID.error) return <Text>Error</Text>

            return (
                <TouchableOpacity key={getByTopicID.data.findTopicByID.id} onPress={() => {
                    navigation.navigate("Child Topics", { rootTopicID: topicID })
                }
                } style={[styles.topic_card, { width: (ScreenWith / numColumns) - 20, height: (ScreenWith / numColumns) + 5 }]} >

                    <View style={styles.topic_card_header}>
                        <Image
                            style={styles.img}
                            source={{
                                uri: getByTopicID.data.findTopicByID.logo
                            }}
                        />
                    </View>

                    <View style={styles.topic_card_footer}>

                        <Text style={styles.topic_card_title_txt}>
                            {getByTopicID.data.findTopicByID.title}
                        </Text>

                        <Text style={styles.topic_card_desc_txt}>
                            {getByTopicID.data.findTopicByID.description}
                        </Text>

                        <Query<any, any> query={isLikedTopicSchema} client={graphqlClient} variables={{ userID: userInfo.userID, topicID: getByTopicID.data.findTopicByID.id }}>
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
                                                variables: { userID: userInfo.userID, topicID: getByTopicID.data.findTopicByID.id },
                                                refetchQueries: [{ query: isLikedTopicSchema, variables: { userID: userInfo.userID, topicID: getByTopicID.data.findTopicByID.id } }]
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
                                                variables: { userID: userInfo.userID, topicID: getByTopicID.data.findTopicByID.id },
                                                refetchQueries: [{ query: isLikedTopicSchema, variables: { userID: userInfo.userID, topicID: getByTopicID.data.findTopicByID.id } }]
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
                        </Query>
                    </View>
                </TouchableOpacity >
            );
        }}
    </Query>

    return (
        <ScrollView style={styles.body}>
            <Query<any, any> query={getRootTopicsSchema}>
                {
                    (getRootTopics) => {
                        if (getRootTopics.error)
                            ToastAndroid.show('No Internet Connection ', ToastAndroid.SHORT);

                        if (getRootTopics.loading)
                            return <Text>Loading......</Text>


                        if (getRootTopics.data) {
                            // return getRootTopics.data.getAllRootTopics.map((res: string) => getTopicDetail(res))
                            return (
                                <FlatList
                                    data={formatData(getRootTopics.data.getAllRootTopics, numColumns)}
                                    renderItem={renderCardItem}
                                    keyExtractor={(index) => index.toString()}
                                    numColumns={numColumns}
                                />
                            )

                        } else {
                            return <Text>No Internet Connection!</Text>
                        }

                    }
                }
            </Query>
        </ScrollView>
    );
}
export default CxDevxTopic;
