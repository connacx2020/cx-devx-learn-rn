import React from 'react';
import { getChildTopicsSchema } from '../../common/graphQL';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { graphqlClient } from '../../common/graphQL/graphql.config';
import { Dimensions, View, Text, ScrollView, ToastAndroid, FlatList } from 'react-native';
import { styles } from './style';
import CxTopicCard from './TopicCard';

function CxDevxChildTopic({ route }: any) {
    const { colors } = useTheme();
    const ScreenWidth = Dimensions.get('window').width;
    const { rootTopicID, rootTitle } = route.params;
    const numColumns = 2;
    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.setOptions({ id: rootTopicID, title: rootTitle });
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
        return topicInfo.empty ?
            <View
                style={[
                    styles.topic_card,
                    { backgroundColor: 'transparent', elevation: 0, width: (ScreenWidth / numColumns) - 20, height: (ScreenWidth / numColumns) + 5 },
                ]}
            /> :
            <CxTopicCard topic={topicInfo} />
    }

    return (
        <ScrollView style={styles.body}>
            <Query<any, any> query={getChildTopicsSchema} variables={{ parentTopicID: rootTopicID }} client={graphqlClient}>
                {
                    (getChildTopics) => {
                        if (getChildTopics.error)
                            ToastAndroid.show('No Internet Connection ', ToastAndroid.SHORT);

                        if (getChildTopics.loading)
                            return <Text>Loading......</Text>


                        if (getChildTopics.data) {
                            console.log("Child Topics",getChildTopics.data);
                            return <FlatList
                                data={formatData(getChildTopics.data.getChildTopics.topics, numColumns)}
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
