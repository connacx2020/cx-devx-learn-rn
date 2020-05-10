import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchStackNavProps } from '../../ultis/ParamLists/SearchParamList';


function CxDevxSearch({ navigation }: SearchStackNavProps<"Search">) {

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
               Search Screen
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

export default CxDevxSearch;
