import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from '../ultis/ParamLists/AuthParamList';

import CxDevLogin from '../components/Login/login';
import CxDevxLanding from '../components/landing';

interface AuthStackProps {}
const Stack = createStackNavigator<AuthParamList>();

const AuthStack: React.FC<AuthStackProps> = ({}) => {
    return (
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
        initialRouteName="Landing"
      >
          <Stack.Screen
          name="Landing"
          component={CxDevxLanding}
        />
        <Stack.Screen
          name="Login"
          component={CxDevLogin}
        />
      </Stack.Navigator>
    );
  };
  export default AuthStack;
