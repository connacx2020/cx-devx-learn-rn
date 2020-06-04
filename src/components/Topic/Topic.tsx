import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { TopicStackNavProps } from '../../ultis/ParamLists/TopicParamList';
import { Topic } from '../../models';
import { useQuery } from '@apollo/react-hooks';
import { getAllTopicsSchema } from '../../common/graphQL';
import { useTheme } from '@react-navigation/native';

function CxDevxTopic({ navigation }: TopicStackNavProps<"Topic">){
    const { colors } = useTheme();
    const [topics, setTopics] = React.useState([]);
    const fetchTopics = useQuery(getAllTopicsSchema,{notifyOnNetworkStatusChange: true})

    React.useEffect(()=>{
        if(fetchTopics.data){
            setTopics(fetchTopics.data.findAllTopic)
        }
    },[topics])

    return (
        <ScrollView style={[styles.body,{backgroundColor:colors.background}]}>
            {
                topics.map((res:Topic) => <View style={styles.topicList}><Text style={[styles.text,{color:colors.text}]}>{res.title}</Text></View>)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor:'#fff',
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
