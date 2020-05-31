import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, Image, TextInput } from "react-native";
import { HomeParamList } from "../common/ultis/ParamLists/HomeParamList";
import Feed from '../components/Feed/Feed';
import PostDetail from '../components/PostDetail/PostDetail';
import { styles } from './styles/header';
import { User } from "../models";
import AsyncStorage from "@react-native-community/async-storage";
import { getCheckedUserInfo } from "../common/ultis/getUserInfo";
import { from } from "rxjs";

import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { searchStyles } from './styles/searchBar';
import { CxDevxCourseDetail } from "../components/CourseDetail/CourseDetail";
import CxDevxCourseOverview  from '../components/CourseOverview/CourseOverview';
import CxDevxCourseContent from '../components/CourseContent/CourseContent';
import CxDevxCourseSection from '../components/CourseSection/CourseSection';

interface HomeStackProps { }
const Stack = createStackNavigator<HomeParamList>();

const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const navigation = useNavigation();
    const [isShowSearch,setShowSearch] = useState(false);
    const [userInfo, setUserInfo] = React.useState<User | any>({});

    React.useEffect(() => {
        let getLocalToken = from(AsyncStorage.getItem("devx_token")).subscribe(
            async (localData: any) => {
                let localUserID = JSON.parse(localData);
                if (localData) {
                    setUserInfo(await getCheckedUserInfo(localUserID.userID));
                }
            }
        )

        return () => {
            getLocalToken.unsubscribe();
        }
    }, []);

    return (
        <Stack.Navigator

            initialRouteName="Feed">
            {/* {addProductRoutes(Stack)} */}
            <Stack.Screen
                name="Feed"
                options={{
                    title: !isShowSearch? 'Devx Learning': '',
                    headerTitleStyle: {
                        fontSize: 28
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                                <Icon style={searchStyles.barsIcon} name="bars" size={30} color="#808080"/>
                            </TouchableOpacity>
                        );
                    },
                    headerRight: () =>{
                        return(
                            !isShowSearch?
                                (
                                    <TouchableOpacity onPress={()=>setShowSearch(true)}>
                                        <Text style={searchStyles.searchTxt}>Search</Text>
                                    </TouchableOpacity>
                                ):
                                (
                                    <TextInput style={searchStyles.searchBar} placeholder="Search ..." />
                                )

                        )
                    }
                }}
                component={Feed}
            />
            <Stack.Screen
                 options={{headerShown: false}}
                name="CourseDetail"
                component={CxDevxCourseDetail}
            />
            <Stack.Screen
                 options={{headerShown: false}}
                name="CourseOverview"
                component={CxDevxCourseOverview}
            />
            <Stack.Screen
                 options={{headerShown: false}}
                name="CourseContent"
                component={CxDevxCourseContent}
            />
            <Stack.Screen
                 options={{headerShown: true}}
                name="CourseSection"
                component={CxDevxCourseSection}
            />
            {/* <Stack.Screen
                name="PostDetail"
                options={{
                    title: 'GraphQl Tutorial',
                    headerTitleStyle: {
                        fontSize: 25
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("In Topic Stack")
                                }}
                            >
                                <Image
                                    style={styles.profileImg}
                                    source={{ uri: userInfo.photo }}
                                />
                            </TouchableOpacity>
                        );
                    }
                }}
                component={PostDetail}
            /> */}
        </Stack.Navigator>
    );
};
export default HomeStack;
