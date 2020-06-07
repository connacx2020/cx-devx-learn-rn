import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CourseDetailTabsParamList } from '../common/ultis/ParamLists/CourseDetailTabsParamList';

import CxDevxCourseOverview from '../components/CourseOverview/CourseOverview';
import CxDevxCourseContent from '../components/CourseContent/CourseContent';

const Tab = createMaterialTopTabNavigator<CourseDetailTabsParamList>();

interface CourseDetailTabsProps{
    courseID: string;
    authourID: string
}

export const CourseDetailTabs: React.FC<any>=(props:any)=>{
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" options={props.authourID} component={CxDevxCourseOverview} />
      <Tab.Screen name="Content" component={CxDevxCourseContent} />
    </Tab.Navigator>
  );
}
