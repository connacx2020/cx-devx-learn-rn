import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


export type HomeParamList = {
    Course: undefined;
    CourseDetail : undefined;
    Feed: undefined;
    PostDetail: undefined;
};


export type HomeStackNavProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>;
    route: RouteProp<HomeParamList, T>;
};
