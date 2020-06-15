import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';

import { styles } from './user_styles';

export const UserProfile: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <ScrollView style={[styles.wrapper, { backgroundColor: colors.background }]}>
            <Async promise={getCheckedUserInfo(route.params.id)}>
                {
                    ({ data, error, isLoading }) => {

                        if (isLoading) return <View><Text>loading</Text></View>
                        if (error) return <View><Text>{error}</Text></View>
                        if (data) {
                            return (
                                <>
                                    <ImageBackground
                                        testID="bgID"
                                        source={{
                                            uri:
                                                "https://cdn4.vectorstock.com/i/1000x1000/77/88/poligonal-background-of-rhombus-gradient-colors-vector-20407788.jpg"
                                        }}
                                        style={styles.header}>
                                        <View style={styles.header_left}>
                                            <TouchableOpacity
                                                style={styles.back_arrow}
                                                onPress={() => navigation.goBack()}>
                                                <FeatherIcon
                                                    testID="iconID"
                                                    name={'arrow-left'}
                                                    size={25}
                                                    color={'#fff'}
                                                />
                                            </TouchableOpacity>
                                            <View style={styles.avator_container}>
                                                <Image
                                                    testID="avatarID"
                                                    style={styles.avatar}
                                                    source={{
                                                        uri: data.photo
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.header_right}>
                                            <Text testID="nameID" style={styles.user_name}>{data.name}</Text>
                                            <View style={styles.devx_view_field}>
                                                <TouchableOpacity testID="btnID" style={styles.devx_view_btn}>
                                                    <Text testID="btnTxt">View on Devx</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.body}>
                                        <View style={{ marginHorizontal: 20, elevation: 2, marginVertical: 10 }}>
                                            <Text style={{ fontSize: 20, padding: 10 }}>{data.about}</Text>
                                        </View>

                                    </View>
                                </>
                            )
                        }
                    }
                }
            </Async>

        </ScrollView>
    );
};
