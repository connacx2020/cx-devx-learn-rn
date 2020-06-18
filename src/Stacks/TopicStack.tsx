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
        options={{headerShown: false}}
        component={Topic}
      />
    </Stack.Navigator>
  );
};
export default TopicStack;
