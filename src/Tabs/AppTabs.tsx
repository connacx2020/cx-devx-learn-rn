import React from "react";

import { AppParamList } from "../common/ultis/ParamLists/AppParamList";
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../Stacks/HomeStack';
import LearnStack from '../Stacks/LearnStack';
import TopicStack from '../Stacks/TopicStack';
import MentorStack from '../Stacks/MentorStack';
import CxStyledComponentsStack from "../Stacks/StyledComponentsStack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<{}> = ({ }) => {

    return (
        <Tabs.Navigator
            initialRouteName="styledComp"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = "";

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Mentor") {
                        return <MCIcon name={"teach"} size={size} color={color} />;
                    } else if (route.name === "Learn") {
                        iconName = "code"
                    } else if (route.name === "Topic") {
                        iconName = "lightbulb-o"
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray"
            }}
        >
            <Tabs.Screen name="Home" component={HomeStack}
                options={{
                    tabBarVisible: true
                }}
            />

            <Tabs.Screen name="styledComp" component={CxStyledComponentsStack}
                options={{
                    tabBarVisible: true
                }}
            />

            {/* <Tabs.Screen name="Mentor" component={MentorStack} /> */}
            <Tabs.Screen name="Learn" component={LearnStack}
                options={{
                    tabBarVisible: true
                }} />
            <Tabs.Screen name="Topic" component={TopicStack}
                options={{
                    tabBarVisible: true
                }} />

        </Tabs.Navigator>
    );
};
