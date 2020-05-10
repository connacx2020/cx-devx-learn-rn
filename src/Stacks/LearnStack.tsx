import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity } from "react-native";
import { LearnParamList } from "../ultis/ParamLists/LearnParamList";
import CxDevxLearn from '../components/Learn/Learn';

import {styles} from './styles/header';

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
        component={CxDevxLearn}
      />
    </Stack.Navigator>
  );
};
export default LearnStack;
