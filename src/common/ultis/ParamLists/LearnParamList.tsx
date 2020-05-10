import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type LearnParamList = {
  Learn: undefined;
}


export type LearnStackNavProps<T extends keyof LearnParamList> = {
  navigation: StackNavigationProp<LearnParamList, T>;
  route: RouteProp<LearnParamList, T>;
};
