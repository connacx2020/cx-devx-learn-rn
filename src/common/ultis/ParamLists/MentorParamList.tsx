import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs'
import { RouteProp } from "@react-navigation/native";

export type MentorParamList = {
  MentorHome: undefined;
  MentorSetting:undefined;
  MentorStep1:undefined;
  MentorStep2:undefined;
  MentorStep3:undefined;
  MentorCareer:undefined;
  MentorSkill:undefined;
  MentorHobbies:undefined;
}


export type MentorStackNavProps<T extends keyof MentorParamList> = {
  navigation: StackNavigationProp<MentorParamList, T>;
  route: RouteProp<MentorParamList, T>;
};

export type MentorTopTabNavProps<T extends keyof MentorParamList> = {
  navigation: MaterialTopTabNavigationProp<MentorParamList, T>;
  route: RouteProp<MentorParamList, T>;
};