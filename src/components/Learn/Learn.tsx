import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LearnStackNavProps } from '../../common/ultis/ParamLists/LearnParamList';

function CxDevxLearn({ navigation }: LearnStackNavProps<"Learn">) {

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
               Learn Screen
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

export default CxDevxLearn;
