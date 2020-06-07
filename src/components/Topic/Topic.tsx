import React from 'react';
import { StyleSheet, View, Text, ScrollView, ToastAndroid } from 'react-native';
import { Topic } from '../../models';
import { getAllTopicsSchema } from '../../common/graphQL';
import { useTheme } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { ActivityIndicator, TouchableOpacity, Image } from 'react-native';

function CxDevxTopic({ navigation }: any) {
    const { colors } = useTheme();

    const renderTopics = (Item: Topic) => <TouchableOpacity key={Item.id} style={{ backgroundColor:'white', elevation: 4, height: 50, display: 'flex', flexDirection: 'row', marginVertical: 2 }}>
        <Image source={{ uri: 'https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg' }} style={{ flex: 1 }} />
        <Text style={{ flex: 5, alignSelf: 'center', fontSize: 23, paddingLeft: 10 }}>{Item.title}</Text>
    </TouchableOpacity>

    return (
        <ScrollView style={{backgroundColor:''}}>
            <Query<any, any> query={getAllTopicsSchema}>
                {
                    ({ loading, error, data }) => {

                        if (error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                        if (loading) return <View style={{ alignSelf: 'center' }} >
                            <View>
                                <ActivityIndicator size="large" />
                            </View>
                        </View>

                        return data.findAllTopic.map((res: Topic) => renderTopics(res))
                    }
                }
            </Query>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    topicList: {
        padding: 10,
        backgroundColor: '#fff',
        margin: 2
    },
    text: {
        fontWeight: 'bold'
    }
});

export default CxDevxTopic;
