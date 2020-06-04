import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


export type HomeParamList = {
    Course: undefined;
    CourseDetail : undefined;
    CourseOverview: undefined;
    CourseContent: undefined;
    CourseSection: undefined;
    Feed: undefined;
    Search:undefined;
    SearchResult:undefined;
};


export type HomeStackNavProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>;
    route: RouteProp<HomeParamList, T>;
};
