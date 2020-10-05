import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity } from "react-native";
import { MentorParamList } from "../common/ultis/ParamLists/MentorParamList";
import CxDevxMentorHome from '../components/Mentor/Mentor_Home/MentorHome';
import CxDevxMentorSetting from '../components/Mentor/Mentor_Setting/MentorSetting';

import { styles } from './styles/header';
import CxDevxChildTopic from "../components/Topic/ChildTopics";

interface MentorStackProps {}

const Stack = createStackNavigator<MentorParamList>();


 const LearnStack: React.FC<MentorStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="MentorHome">
      <Stack.Screen
        name="MentorHome"
        options={{headerShown: false}}
        component={CxDevxMentorHome}
      />
      <Stack.Screen
        name="MentorSetting"
        options={{headerShown: false}}
        component={CxDevxMentorSetting}
      />
       <Stack.Screen
        name="Child Topics"
        options={{headerShown: true}}
        component={CxDevxChildTopic}
      />
    </Stack.Navigator>
  );
};
export default LearnStack;
