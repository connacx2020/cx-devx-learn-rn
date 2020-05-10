import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type TopicParamList = {
  Topic: undefined;
}


export type TopicStackNavProps<T extends keyof TopicParamList> = {
  navigation: StackNavigationProp<TopicParamList, T>;
  route: RouteProp<TopicParamList, T>;
};
