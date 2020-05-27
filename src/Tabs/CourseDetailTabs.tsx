import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CourseDetailTabsParamList } from '../common/ultis/ParamLists/CourseDetailTabsParamList';

import CxDevxCourseOverview from '../components/CourseOverview';
import CxDevxCourseContent from '../components/CourseContent';

const Tab = createMaterialTopTabNavigator<CourseDetailTabsParamList>();

interface CourseDetailTabsProps{}
export const CourseDetailTabs: React.FC<CourseDetailTabsProps>=({})=>{
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={CxDevxCourseOverview} />
      <Tab.Screen name="Content" component={CxDevxCourseContent} />
    </Tab.Navigator>
  );
}
