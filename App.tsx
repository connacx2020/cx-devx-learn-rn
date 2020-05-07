/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CxDevxLanding from './src/components/landing';
import CxDevxLogin from './src/components/Login/login';
import CxDevxHome from './src/components/Home/home';

const Stack = createStackNavigator();
// const token: String = '';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Landing" component={CxDevxLanding} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={CxDevxLogin} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={CxDevxHome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
