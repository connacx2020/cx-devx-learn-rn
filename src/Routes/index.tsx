import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";


import { Center } from '../common/ultis/Center';
import { AuthContext } from "../Providers/AuthProvider";
import AuthStack from "../Stacks/AuthStack";
import { AppDrawer } from '../Drawers';
import { getCheckedUserInfo } from "../common/ultis/getUserInfo";
import { store, saveUserInfo } from "../common/redux";


interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isLogined, setLogin] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("devx_token")
            .then(async (localToken: any) => {
                const localData = JSON.parse(localToken);
                if (localToken) {
                    setLogin(true);
                    store.dispatch(saveUserInfo(await getCheckedUserInfo(localData.userID)))
                } else {
                    setLogin(false);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        // AsyncStorage.getItem("devx_token")
        //     .then(localToken => {
        //         if (localToken === token) {
        //         setLogin(true);
        //         }else{
        //             setLogin(false)
        //         }

        //         setLoading(false);

        //     })
        //     .catch(err => {
        //         console.log(err);
        // });
    }, [token]);

    // if (loading) {
    //     return (
    //         <Center>
    //             <ActivityIndicator size="large" />
    //         </Center>
    //     );
    // }

    return (
        <NavigationContainer>
            { !isLogined? <AuthStack /> : <AppDrawer />}
        </NavigationContainer>
    );
};
