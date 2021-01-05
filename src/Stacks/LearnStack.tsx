import React, { useContext, useState } from "react";
import { CxDevxCourseDetail } from "../components/course/CourseDetail/CourseDetail";
import CxDevxCourseOverview from '../components/course/CourseOverview/CourseOverview';
import CxDevxCourseContent from '../components/Search/CourseContent/CourseContent';
import CxDevxCourseSection from '../components/course/CourseSection/CourseSection';
import DevxSearch from "../components/Search/DevxSearch";
import { InstructorProfile as CxDevxInstructorProfile } from '../components/Profile/InstructorProfile';
import { createStackNavigator } from "@react-navigation/stack";
import { LearnParamList } from "../common/ultis/ParamLists/LearnParamList";
import CxDevXLearn from "../components/Learn/Learn";
import { TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { AuthContext } from "../Providers/AuthProvider";
import FeatureIcon from 'react-native-vector-icons/Feather';
import { searchStyles } from './styles/searchBar';
import { Searchbar } from 'react-native-paper';
import { CxAppBar } from "../components/AppBar/appBar";

interface LearnStackProps { }

const Stack = createStackNavigator<LearnParamList>();

const LearnStack: React.FC<LearnStackProps> = ({ }) => {

    const navigation = useNavigation();
    const [isShowSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const { isDarkTheme } = useContext(AuthContext);
    const screenWidth = Math.round(Dimensions.get('window').width);

    return (
        <Stack.Navigator initialRouteName="Learn">
            <Stack.Screen
                name="Learn"
                options={{
                    title: 'Learn',
                    headerTitleStyle: {
                        fontSize: 25
                    },
                    header: (props) => {
                        return (
                            <CxAppBar {...props} title='Courses' />
                        )
                    }
                }}
                component={CxDevXLearn}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="CourseDetail"
                component={CxDevxCourseDetail}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="CourseOverview"
                component={CxDevxCourseOverview}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="CourseContent"
                component={CxDevxCourseContent}
            />
            <Stack.Screen
                options={{ headerShown: true }}
                name="CourseSection"
                component={CxDevxCourseSection}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="InstructorProfile"
                component={CxDevxInstructorProfile}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="SearchCourse"
                component={DevxSearch}
            />
        </Stack.Navigator>
    );
};
export default LearnStack;
