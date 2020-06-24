import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';
import { AuthNavProps } from '../common/ultis/ParamLists/AuthParamList';

function CxDevxLanding({ navigation }: AuthNavProps<"Login">) {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Login");
        }, 1000);
    });
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Welcome From Devx Learning.
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

export default CxDevxLanding
