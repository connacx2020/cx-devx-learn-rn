import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "../ultis/ParamLists/AppParamList";
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeStack from '../Stacks/HomeStack';
import SearchStack from '../Stacks/SearchStack';
import LearnStack from '../Stacks/LearnStack';
import TopicStack from '../Stacks/TopicStack';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName : string ="";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Learn") {
              iconName="code"
          }else if (route.name === "Search"){
              iconName="search"
          }else if(route.name === "Topic"){
              iconName="lightbulb-o"
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Learn" component={LearnStack} />
      <Tabs.Screen name="Search" component={SearchStack} />
      <Tabs.Screen name="Topic" component={TopicStack} />

    </Tabs.Navigator>
  );
};
