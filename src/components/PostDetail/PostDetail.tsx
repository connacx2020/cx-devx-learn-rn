import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HomeStackNavProps } from '../../ultis/ParamLists/HomeParamList'

import { AuthNavProps } from 'src/ultis/ParamLists/AuthParamList'



function CxDevxDetail({ navigation }: HomeStackNavProps<"PostDetail">) {

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                GraphQL Detail
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

export default CxDevxDetail;
