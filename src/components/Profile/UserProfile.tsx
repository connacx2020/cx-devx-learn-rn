import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { DrawerActions, useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './user_styles';
import FeatureIcon from 'react-native-vector-icons/Feather';
import Flag from 'react-native-flags-typescript';
import { Card } from 'react-native-paper';

export const UserProfile: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <ScrollView style={[{ backgroundColor: colors.background }]}>
            <Async promise={getCheckedUserInfo(route.params.id)}>
                {
                    ({ data, error, isLoading }) => {

                        if (isLoading) return <View><Text>loading</Text></View>
                        if (error) return <View><Text>{error}</Text></View>
                        if (data) {
                            console.log("national",data.nationality)
                            return (
                                <View style={styles.container}>
                                    <LinearGradient
                                        style={styles.topContainer}
                                        colors={['#48C9B0', '#58D68D']}>
                                        <View style={styles.header}>
                                            <FeatureIcon name="menu" size={25} color='white' onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                                        </View>
                                        <View style={styles.topMain}>
                                            <Image
                                                testID="avatarID"
                                                style={styles.avatar}
                                                source={{
                                                    uri: data.photo
                                                }}
                                            />
                                            <View style={styles.nameSection}>
                                                <Text testID="nameID" style={styles.name}>{data.name}</Text>
                                                <Flag code={data.nationality} size={32}/>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    {/* <Card
                                        style={
                                            
                                        }
                                    >

                                    </Card> */}
                                </View>
                            )
                        }
                    }
                }
            </Async>

        </ScrollView>
    );
};
