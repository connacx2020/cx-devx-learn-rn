import React from 'react';
import { View, Text, ScrollView, ToastAndroid, FlatList, Dimensions } from 'react-native';
import { getRootTopicsSchema } from '../../common/graphQL';
import { Query } from '@apollo/react-components';
import { styles } from './style';
import CxTopicCard from './TopicCard';

function CxDevxTopic() {
    const ScreenWidth = Dimensions.get('window').width;
    const numColumns = 2;

    const formatData = (dataList: any, numColumns: number) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - totalRows * numColumns;

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++;
        }
        return dataList;
    };

    const renderCardItem = (topicInfo: any) => {
        return topicInfo.item.empty ?
            <View
                style={[
                    styles.topic_card,
                    { backgroundColor: 'transparent', elevation: 0, width: (ScreenWidth / numColumns) - 20, height: (ScreenWidth / numColumns) + 5 },
                ]}
            /> :
            <CxTopicCard topic={topicInfo.item} />
    }

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
                                    data={formatData(getRootTopics.data.getRootTopics.topics, numColumns)}
                                    renderItem={(item) => renderCardItem(item)}
                                    keyExtractor={(index) => index.toString()}
                                    numColumns={numColumns}
                                />
                            )

                        } else {
                            return <Text style={{ marginVertical: Math.floor(Dimensions.get('window').height) / 2.5, marginHorizontal: Math.floor(Dimensions.get('window').width) / 2.5 }}>No Data!</Text>
                        }

                    }
                }
            </Query>
        </ScrollView>
    );
}
export default CxDevxTopic;
