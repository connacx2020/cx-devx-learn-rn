import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TopicStackNavProps } from '../../ultis/ParamLists/TopicParamList';

function CxDevxTopic({ navigation }: TopicStackNavProps<"Topic">){

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
              Topic Screen
        </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }

});

export default CxDevxTopic;
