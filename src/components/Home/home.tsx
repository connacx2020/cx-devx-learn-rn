import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CxDevxLogin: React.FC = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                 Devx Learning
            </Text>
            <Text style={styles.home_text}>
                Home
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
    },
    home_text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize : 14
    }

});

export default CxDevxLogin;
