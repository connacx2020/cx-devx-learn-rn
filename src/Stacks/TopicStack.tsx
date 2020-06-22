import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TopicParamList } from "../common/ultis/ParamLists/TopicParamList";
import Topic from '../components/Topic/Topic';
import CxDevxChildTopic from "../components/Topic/ChildTopics";

interface HomeStackProps {}

const Stack = createStackNavigator<TopicParamList>();


 const TopicStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Topics">
      <Stack.Screen
        name="Topics"
        options={{headerShown: true}}
        component={Topic}
      />
      <Stack.Screen
        name="Child Topics"
        options={{headerShown: true}}
        component={CxDevxChildTopic}
      />
    </Stack.Navigator>
  );
};
export default TopicStack;
