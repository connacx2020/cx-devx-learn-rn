import React from 'react';
import {useState} from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    Animated,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { checkUserInfoInRedux } from '../../common/ultis/checkUserInfoInRedux';
import { getCheckedUserInfo } from '../../common/ultis/getUserInfo';
import { User } from '../../models';

const HEADER_MAX_HEIGHT: number = 120;
const HEADER_MIN_HEIGHT: number = 70;
const PROFILE_IMAGE_MAX_HEIGHT: number = 80;
const PROFILE_IMAGE_MIN_HEIGHT: number = 40;

export const CxDevxProfile: React.FC = () => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    const profileImageHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const profileImageMarginTop = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [
            HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
            HEADER_MAX_HEIGHT + 5,
        ],
        extrapolate: 'clamp',
    });
    const headerZindex = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
        outputRange: [0, 0, 1000],
        extrapolate: 'clamp',
    });

    const headerTitleBottom = scrollY.interpolate({
        inputRange: [
            0,
            HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
            HEADER_MAX_HEIGHT -
                HEADER_MIN_HEIGHT +
                5 +
                PROFILE_IMAGE_MIN_HEIGHT,
            HEADER_MAX_HEIGHT -
                HEADER_MIN_HEIGHT +
                5 +
                PROFILE_IMAGE_MIN_HEIGHT +
                26,
        ],
        outputRange: [-20, -20, -20, 0],
        extrapolate: 'clamp',
    });

    const [userInfo, setUserInfo] = React.useState<User>();

    React.useEffect(()=>{
        AsyncStorage.getItem("devx_token")
        .then(async (localToken: any) => {
            const localData = JSON.parse(localToken);
            setUserInfo(await getCheckedUserInfo(localData.userID));
            console.log(await getCheckedUserInfo(localData.userID))
        })
        .catch(err => {
            console.log(err);
        });
    },[userInfo])

    return (
        <View style={{flex: 1}}>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#EF233C',
                    height: headerHeight,
                    zIndex: headerZindex,
                    elevation: headerZindex, //required for android
                    alignItems: 'center',
                }}>
                <Animated.View
                    style={{position: 'absolute', bottom: headerTitleBottom}}>
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 28,
                            fontWeight: 'bold',
                            padding:25
                        }}>
                        {userInfo?.name}
                    </Text>
                </Animated.View>
            </Animated.View>

            <ScrollView
                style={{flex: 1}}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {y: scrollY}}},
                ])}>
                <Animated.View
                    style={{
                        height: profileImageHeight,
                        width: profileImageHeight,
                        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                        borderColor: 'white',
                        borderWidth: 3,
                        overflow: 'hidden',
                        marginTop: profileImageMarginTop,
                        marginLeft: 10,
                    }}>
                    <Image
                        source={{
                            // uri: userInfo?.photo
                            uri:'https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg'
                        }}
                    />
                </Animated.View>
                <View>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 26,
                            paddingLeft: 15,
                        }}>
                            {
                                userInfo?.gender
                            }
                    </Text>
                </View>

                <View style={{height: 1000}} />
            </ScrollView>
        </View>
    );
};
