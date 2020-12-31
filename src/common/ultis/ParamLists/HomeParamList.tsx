import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


export type HomeParamList = {
  Home: undefined;
  Feed: undefined;
  SearchPost: undefined;
  PostDetail: undefined;
};


export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
  isShowSearch: boolean;
};
