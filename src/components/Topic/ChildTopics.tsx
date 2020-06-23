import React from 'react';
import { View, Text, ScrollView, ToastAndroid, FlatList } from 'react-native';
import { isLikedTopicSchema, likeTopicSchema, unlikeTopicSchema, getChildTopicsSchema, findTopicByIDSchema } from '../../common/graphQL';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';

import { ActivityIndicator, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from './style';

function CxDevxChildTopic({ route }: any) {
    const { colors } = useTheme();
    const ScreenWith = Dimensions.get('window').width;
    const { rootTopicID, rootTitle } = route.params;
    const numColumns = 2;
    const navigation = useNavigation();
    const userInfo: AuthUserInfo = useSelector(
        (state: any) => state.authUserInfo,
    );
    const [likeHandler] = useMutation(likeTopicSchema, { client: graphqlClient });
    const [unlikeHandler] = useMutation(unlikeTopicSchema, {
        client: graphqlClient,
    });


    React.useEffect(() => {
        navigation.setOptions({ title: rootTitle })
    }, [])

    const formatData = (dataList: [any], numColumns: number) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - totalRows * numColumns;

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    const renderCardItem = (topicInfo: any) => {
        if (topicInfo.empty) {
            return (
                <View
                    style={[
                        styles.topic_card,
                        { backgroundColor: 'transparent', elevation: 0, width: (ScreenWith / numColumns) - 20, height: (ScreenWith / numColumns) + 5 },
                    ]}
                />
            );
        } else {
            return getTopicDetail(topicInfo)
        }
    }

    const getTopicDetail = (topicID: string) => {

        return (<Query<any, any> query={findTopicByIDSchema} variables={{ topicID }}>
            {(getByTopicID) => {
                if (getByTopicID.loading) return <Text>Loading....</Text>
                if (getByTopicID.error) return <Text>Error</Text>

                return (
                    <Query<any, any> client={graphqlClient} query={getChildTopicsSchema} variables={{ topicID }}>
                        {
                            (getChildTopics) => {
                                if (getChildTopics.loading) <Text>Loading....</Text>
                                if (getChildTopics.error) <Text>Error...</Text>

                                return (
                                    <TouchableOpacity key={getByTopicID.data.findTopicByID.id} onPress={() =>
                                        getChildTopics.data.getAllChildTopics[0] ? navigation.push("Child Topics", { rootTopicID: topicID, rootTitle: getByTopicID.data.findTopicByID.title }) : ToastAndroid.show("No more child Topics", ToastAndroid.SHORT)

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
                                )
                            }
                        }
                    </Query>

                );
            }}
        </Query>)
    }

    return (
        <ScrollView style={styles.body}>
            <Query<any, any> query={getChildTopicsSchema} variables={{ topicID: rootTopicID }} client={graphqlClient}>
                {
                    (getChildTopics) => {
                        if (getChildTopics.error)
                            ToastAndroid.show('No Internet Connection ', ToastAndroid.SHORT);

                        if (getChildTopics.loading)
                            return <Text>Loading......</Text>


                        if (getChildTopics.data) {

                            return <FlatList
                                data={formatData(getChildTopics.data.getAllChildTopics, numColumns)}
                                renderItem={({ item }) => renderCardItem(item)}
                                keyExtractor={(index) => index}
                                numColumns={numColumns}
                            />
                        } else {
                            return <Text>No Internet Connection!</Text>
                        }

                    }
                }
            </Query>
        </ScrollView>
    );
}
export default CxDevxChildTopic;
