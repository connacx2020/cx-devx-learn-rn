import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabs } from '../Tabs/AppTabs';
import { CxDevxLogout } from '../components/Logout';
import {CxDevxProfile} from '../components/Profile';

const Drawer = createDrawerNavigator();

interface AppDrawerProps {};

export const AppDrawer: React.FC<AppDrawerProps> = ({}) => {
    return(
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Profile" component={CxDevxProfile}/>
        <Drawer.Screen name="Home" component={AppTabs} />
        <Drawer.Screen name="Logout" component={CxDevxLogout}/>
      </Drawer.Navigator>
    );
}
