import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme  } from 'react-native-paper';
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
    const { token,isDarkTheme } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isLogined, setLogin] = useState(false);

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
          ...NavigationDefaultTheme.colors,
          ...PaperDefaultTheme.colors,
          background: '#ffffff',
          text: '#333333'
        }
      }

      const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
          ...NavigationDarkTheme.colors,
          ...PaperDarkTheme.colors,
          background: '#333333',
          text: '#ffffff'
        }
      }

      const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


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
    }, [token]);

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                { false ? <AuthStack /> : <AppDrawer />}
            </NavigationContainer>
        </PaperProvider>
    );
};
