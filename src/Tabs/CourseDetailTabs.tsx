import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CourseDetailTabsParamList } from '../common/ultis/ParamLists/CourseDetailTabsParamList';

import CxDevxCourseOverview from '../components/course/CourseOverview/CourseOverview';
import CxDevxCourseContent from '../components/Search/CourseContent/CourseContent';
import { Course } from '../models';

const Tab = createMaterialTopTabNavigator<CourseDetailTabsParamList>();

export const CourseDetailTabs: React.FC<any> = (props: Course) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview">
        {() => <CxDevxCourseOverview
          {...props}
        />}
      </Tab.Screen>
      <Tab.Screen name="Content" >
        {
          () => <CxDevxCourseContent {...props} />
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
}
