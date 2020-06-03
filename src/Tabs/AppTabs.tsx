import React, { useEffect } from "react";

import { AppParamList } from "../common/ultis/ParamLists/AppParamList";
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeStack from '../Stacks/HomeStack';
import LearnStack from '../Stacks/LearnStack';
import TopicStack from '../Stacks/TopicStack';

interface AppTabsProps {}

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tabs = createBottomTabNavigator<AppParamList>();
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// const Tabs = createMaterialBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {

    // const {name : routeName}  = navigationRef.current.getCurrentRoute();
    return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName : string ="";

          if (route.name === "Course") {
            iconName = "home";
          } else if (route.name === "Learn") {
              iconName="code"
          }else if(route.name === "Topic"){
              iconName="lightbulb-o"
          }

          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}
    >
      <Tabs.Screen name="Course" component={HomeStack}
            options={{
                tabBarVisible: true
            }}
       />
      <Tabs.Screen name="Learn" component={LearnStack} />
      <Tabs.Screen name="Topic" component={TopicStack} />

    </Tabs.Navigator>
  );
};
