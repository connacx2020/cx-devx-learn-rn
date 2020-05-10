import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import AsyncStorage  from "@react-native-community/async-storage";


import { Center } from '../ultis/Center';
import { AuthContext } from "../Providers/AuthProvider";
import { AppTabs } from "../Tabs/AppTabs";
import  AuthStack  from "../Stacks/AuthStack";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isLogined,setLogin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("devx_token")
      .then(localToken => {
        console.log(localToken);
        if (localToken) {
          setLogin(true);
        }else{
            setLogin(false)
        }

        setLoading(false);

      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
     {!isLogined ? <AuthStack /> : <AppTabs />}
    </NavigationContainer>
  );
};
