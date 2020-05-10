import React from 'react';
import {View, StyleSheet} from 'react-native';

interface CenterProps {}

export const Center: React.FC<CenterProps> = ({children}) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
