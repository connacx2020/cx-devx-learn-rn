import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, Image } from "react-native";
import { AuthContext } from '../Providers/AuthProvider';
import { HomeParamList } from "../common/ultis/ParamLists/HomeParamList";
import Feed from '../components/Feed/Feed';
import PostDetail from '../components/PostDetail/PostDetail';
import { styles } from './styles/header';
import { User } from "../models";
import AsyncStorage from "@react-native-community/async-storage";
import { getCheckedUserInfo } from "../common/ultis/getUserInfo";
import { from } from "rxjs";

interface HomeStackProps { }

const Stack = createStackNavigator<HomeParamList>();


const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const { logout } = useContext(AuthContext);
    const [userInfo, setUserInfo] = React.useState<User | any>({});

    React.useEffect(() => {
        let getLocalToken = from(AsyncStorage.getItem("devx_token")).subscribe(
            async (localData: any) => {
                let localUserID = JSON.parse(localData);
                if (localData) {
                    setUserInfo(await getCheckedUserInfo(localUserID.userID));
                }
            }
        )

        return () => {
            getLocalToken.unsubscribe();
        }
    }, []);

    return (
        <Stack.Navigator initialRouteName="Feed">
            {/* {addProductRoutes(Stack)} */}
            <Stack.Screen
                name="Feed"
                options={{
                    title: 'Devx Learning',
                    headerTitleStyle: {
                        fontSize: 25
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("In Topic Stack")
                                }}
                            >
                                {/* <Text>{userInfo.name}</Text> */}
                                <Image
                                    style={styles.profileImg}
                                    source={{ uri: userInfo.photo }}
                                />
                            </TouchableOpacity>
                        );
                    }
                }}
                component={Feed}
            />

            <Stack.Screen
                name="PostDetail"
                options={{
                    title: 'GraphQl Tutorial',
                    headerTitleStyle: {
                        fontSize: 25
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("In Topic Stack")
                                }}
                            >
                                <Image
                                    style={styles.profileImg}
                                    source={{ uri: userInfo.photo }}
                                />
                            </TouchableOpacity>
                        );
                    }
                }}
                component={PostDetail}
            />
        </Stack.Navigator>
    );
};
export default HomeStack;
