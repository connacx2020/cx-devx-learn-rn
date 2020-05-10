import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity,Image } from "react-native";
import { TopicParamList } from "../ultis/ParamLists/TopicParamList";
import Topic from '../components/Topic/Topic';

import { styles } from './styles/header';
interface HomeStackProps {}

const Stack = createStackNavigator<TopicParamList>();


 const TopicStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Topic">
      <Stack.Screen
        name="Topic"
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
        component={Topic}
      />
    </Stack.Navigator>
  );
};
export default TopicStack;
