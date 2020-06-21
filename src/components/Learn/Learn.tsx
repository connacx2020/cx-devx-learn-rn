import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LearnStackNavProps } from '../../common/ultis/ParamLists/LearnParamList';
import { useTheme } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
function CxDevxLearn({ navigation }: LearnStackNavProps<"Learn">) {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            
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
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }

});

export default CxDevxLearn;
