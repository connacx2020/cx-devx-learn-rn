import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


export type CourseDetailParamList = {
    Course: undefined;
    CourseDetail : undefined;
    CourseOverview: undefined;
    CourseContent: undefined;
    CourseSection: undefined;
    Feed: undefined;
};


export type CourseDetailStackNavProps<T extends keyof CourseDetailParamList> = {
    navigation: StackNavigationProp<CourseDetailParamList, T>;
    route: RouteProp<CourseDetailParamList, T>;
};
