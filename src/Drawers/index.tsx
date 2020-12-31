import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabs } from '../Tabs/AppTabs';
import { CxDevxLogout } from '../components/Logout';
import { UserProfile as CxDevxProfile } from '../components/Profile/UserProfile';
import { DrawerContent } from './DrawerContent';
import { CxDevxCourseCreate } from '../components/course/CourseCreate/CourseCreate';
import CxDevxLanding from '../components/landing';

const Drawer = createDrawerNavigator();

interface AppDrawerProps { };

export const AppDrawer: React.FC<AppDrawerProps> = ({ }) => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={AppTabs} />
            <Drawer.Screen name="UserProfile" component={CxDevxProfile} />
            <Drawer.Screen name="Logout" component={CxDevxLogout} />
            <Drawer.Screen name="createCourse" component={CxDevxCourseCreate} />
        </Drawer.Navigator>
    );
}
