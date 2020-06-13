import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity } from "react-native";
import { LearnParamList } from "../ultis/ParamLists/LearnParamList";
import CxDevxLearn from '../components/Learn/Learn';

import { styles } from './styles/header';

interface LearnStackProps {}

const Stack = createStackNavigator<LearnParamList>();


 const LearnStack: React.FC<LearnStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Learn">
      <Stack.Screen
        name="Learn"
        options={{
            title: 'Devx Learning',
            headerTitleStyle: {
                  fontSize:25
            }
          }}
        component={CxDevxLearn}
      />
    </Stack.Navigator>
  );
};
export default LearnStack;
