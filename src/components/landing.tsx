import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useEffect} from 'react';


const CxDevxLanding: React.FC = () => {
    useEffect(()=>{

    },[]);
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
