import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LearnParamList } from "../ultis/ParamLists/LearnParamList";
import CxDevxLearn from '../components/Learn/Learn';

interface LearnStackProps { }

const Stack = createStackNavigator<LearnParamList>();


const LearnStack: React.FC<LearnStackProps> = ({ }) => {
    return (
        <Stack.Navigator initialRouteName="Learn">
            <Stack.Screen
                name="Learn"
                options={{
                    title: 'devX',
                    headerTitleStyle: {
                        fontSize: 25
                    }
                }}
                component={CxDevxLearn}
            />
        </Stack.Navigator>
    );
};
export default LearnStack;
