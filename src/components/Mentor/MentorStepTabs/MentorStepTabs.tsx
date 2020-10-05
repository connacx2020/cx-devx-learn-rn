import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute,useNavigation } from '@react-navigation/native';

import { MentorParamList } from '../../../common/ultis/ParamLists/MentorParamList';
import MentorStep1 from '../MentorSteps/MentorStep1/MentorStep1';
import MentorStep2 from '../MentorSteps/MentorStep2/MentorStep2';
import MentorStep3 from '../MentorSteps/MentorStep3/MentorStep3';



const Tab = createMaterialTopTabNavigator<MentorParamList>();

export const CourseDetailTabs: React.FC<any>=({})=>{
  const route = useRoute();
  const navigation = useNavigation()
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: route.name === "MentorStep1"? "Step 1": route.name === "MentorStep2"? "Step 2" : "Step 3",
        labelStyle: {
          fontSize: 15,
        },
        tabStyle: {
          width: 100,    
        },
        
      })}
      
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray"
        
      }}
    >
      <Tab.Screen name="MentorStep1" component={MentorStep1}/>
      <Tab.Screen name="MentorStep2" component={MentorStep2}/>
      <Tab.Screen name="MentorStep3" component={MentorStep3}/>
    </Tab.Navigator>
  );
}
