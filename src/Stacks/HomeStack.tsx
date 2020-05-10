import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity,Image } from "react-native";
import {AuthContext} from '../Providers/AuthProvider';
import { HomeParamList } from "../ultis/ParamLists/HomeParamList";
import Feed from '../components/Feed/Feed';
import PostDetail from '../components/PostDetail/PostDetail';
import {styles} from './styles/header';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();


 const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      {/* {addProductRoutes(Stack)} */}
      <Stack.Screen
        name="Feed"
        options={{
            title: 'Devx Learning',
            headerTitleStyle: {
                  fontSize:25
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
                      source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgOjtYQ5PrC1mO_8ZQNI6NKTU1fCCmMNUljmvfpGcCp3qC_YMQ&usqp=CAU'}}
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
                  fontSize:25
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
                      source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgOjtYQ5PrC1mO_8ZQNI6NKTU1fCCmMNUljmvfpGcCp3qC_YMQ&usqp=CAU'}}
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
