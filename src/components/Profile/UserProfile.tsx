import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Linking } from 'react-native';
import { DrawerActions, useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { Async } from 'react-async';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './user_styles';
import FeatureIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Flag from 'react-native-flags-typescript';
import csc from 'country-state-city';
import Tooltip from 'react-native-walkthrough-tooltip';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export const UserProfile: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const { colors } = useTheme();
    return (
        <Async promise={getCheckedUserInfo(route.params.id)}>
            {
                ({ data, error, isLoading }) => {

                    if (isLoading) return <View><Text>loading</Text></View>
                    if (error) return <View><Text>{error}</Text></View>
                    if (data) {
                        console.log("national", data.nationality)
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
                                            <Tooltip isVisible={tooltipVisible} placement='top' onClose={() => setTooltipVisible(false)} content={<Text>{csc.getCountryByCode(data.nationality).name}</Text>}>
                                                <TouchableOpacity style={{}} onPress={() => setTooltipVisible(!tooltipVisible)}>
                                                    <Flag code={data.nationality} size={32} />
                                                </TouchableOpacity>
                                            </Tooltip>
                                        </View>
                                        <View style={styles.addressSection}>
                                            <EntypoIcon size={20} name='location-pin' color='white' />
                                            <Text style={styles.addressText}>{data.addresses[0].city}, {csc.getCountryByCode(data.nationality).name}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                                <View
                                    style={[styles.body, { backgroundColor: colors.card }]}
                                >
                                    <ScrollView>
                                        <View style={{ margin: 30 }}>
                                            <Text style={styles.labelText}>About</Text>
                                            <Text style={styles.aboutText}>{data.about}</Text>

                                            <Text style={styles.labelText}>Links</Text>
                                            {
                                                data.weblinks && data.weblinks.map(link =>
                                                    <View style={{ flexDirection: 'row', padding: 7 }}>
                                                        <Text style={styles.sourceText}>{link.source}:</Text>
                                                        <Text style={styles.linkText} onPress={() => Linking.openURL(link.url)}>{link.url}</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        )
                    }
                }
            }
        </Async>
    );
};
