import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { CxAppBar } from '../components/AppBar/appBar';
import { CxStyledComponents } from '../components/styled';

const Stack = createStackNavigator();

const CxStyledComponentsStack: React.FC = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName={"styledComponents"}
            screenOptions={{
                header: (props) => {
                    return (
                        <CxAppBar {...props} title='Styled Components' />
                    )
                }
            }}
        >

            <Stack.Screen
                options={{ headerShown: true }}
                name="styled"
            >
                {props => <CxStyledComponents />}
            </Stack.Screen>

        </Stack.Navigator>
    )
}

export default CxStyledComponentsStack
