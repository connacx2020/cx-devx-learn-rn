import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { saveMentorStep } from '../../../../common/redux/redux-actions';
import { store } from "../../../../common/redux";
import { MentorTopTabNavProps } from '../../../../common/ultis/ParamLists/MentorParamList';
import { useTheme } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

function CxDevxMentorStep2({ navigation,route }: MentorTopTabNavProps<"MentorStep2">) {
    const { colors } = useTheme();
    useFocusEffect(() => {
            store.dispatch(saveMentorStep(route.name));
      })
    

    return (
        <View style={[styles.body,{backgroundColor:colors.background}]}>
            <Text style={[styles.text,{color:colors.text}]}>
               Mentor Step 2 Screen
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
        backgroundColor:'white'
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }

});

export default CxDevxMentorStep2;
