import React from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { Topic } from '../../models';
import { getAllTopicsSchema, isLikedTopicSchema, likeTopicSchema, unlikeTopicSchema} from '../../common/graphQL';
import { useTheme } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { AuthUserInfo } from '../../common/redux/redux-actions';

import { ActivityIndicator, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { styles } from './style';
function CxDevxTopic({ navigation }: any) {
    const { colors } = useTheme();
    const numColumns = 2;
    const userInfo: AuthUserInfo = useSelector(
        (state: any) => state.authUserInfo,
    );
    const [likeHandler] = useMutation(likeTopicSchema, { client: graphqlClient });
    const [unlikeHandler] = useMutation(unlikeTopicSchema, {
        client: graphqlClient,
    });

    const formatData = (dataList: number, numColumns: number) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - totalRows * numColumns;

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    const renderCardItem = ({ item }) => {
        if (item.empty) {
            return (
                <View
                    style={[
                        styles.topic_card,
                        { backgroundColor: 'transparent', elevation: 0 },
                    ]}
                />
            );
        }
        return (
            <View style={styles.topic_card}>
                <View style={styles.topic_card_header}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: item.logo,
                        }}
                    />
                    
                </View>
                <View style={styles.topic_card_footer}>
                <Query<any, any> query={isLikedTopicSchema} client={graphqlClient} variables={{userID: userInfo.userID, topicID: item.id}}>
                        {(isLikedTopicData) => {
                            console.log(isLikedTopicData.data);
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
                                        <Icon
                                            name={'like2'}
                                            size={20}
                                            color={'#7C7879'}
                                        />
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
                                        <Icon
                                            name={'like1'}
                                            size={20}
                                            color={"#1E91D6"}
                                        />
                                    </TouchableOpacity>
                                );
                            }

                        }}
                    </Query>
                    <Text style={styles.topic_card_title_txt}>
                        {item.title}
                    </Text>
                    <Text style={styles.topic_card_desc_txt}>
                        {item.description}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <ScrollView style={styles.body}>
            <Query<any, any> query={getAllTopicsSchema}>
                {({ loading, error, data }) => {
                    if (error)
                        ToastAndroid.show(
                            'No Internet Connection ',
                            ToastAndroid.SHORT,
                        );

                    if (loading)
                        return (
                            <View style={{ alignSelf: 'center' }}>
                                <View>
                                    <ActivityIndicator size="large" />
                                </View>
                            </View>
                        );

                    return (
                        <FlatList
                            data={formatData(data.findAllTopic, numColumns)}
                            renderItem={renderCardItem}
                            keyExtractor={(index) => index.toString()}
                            numColumns={numColumns}
                        />
                    );
                }}
            </Query>
        </ScrollView>

    );
}
export default CxDevxTopic;
