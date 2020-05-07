import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

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
export default CxDevxLogin;
