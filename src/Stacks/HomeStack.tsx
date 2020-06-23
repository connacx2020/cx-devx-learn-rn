import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, Image, TextInput,Dimensions,View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatureIcon from 'react-native-vector-icons/Feather';
import { Searchbar } from 'react-native-paper';
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


import { searchStyles } from './styles/searchBar';
import { CxDevxCourseDetail } from "../components/CourseDetail/CourseDetail";
import CxDevxCourseOverview  from '../components/CourseOverview/CourseOverview';
import CxDevxCourseContent from '../components/CourseContent/CourseContent';
import CxDevxCourseSection from '../components/CourseSection/CourseSection';
import { InstructorProfile as CxDevxInstructorProfile} from '../components/Profile/InstructorProfile'

import { AuthContext } from "../Providers/AuthProvider";
import DevxSearch from "../components/Search/DevxSearch";
import CxDevxSearchResult from "../components/Search/DevxSearchResult";


interface HomeStackProps { }
const Stack = createStackNavigator<HomeParamList>();

const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const navigation = useNavigation();
    const {isDarkTheme } = useContext(AuthContext);
    const [isShowSearch,setShowSearch] = useState(false);
    const [searchValue,setSearchValue] = React.useState<String | undefined>('');
    const screenWidth = Math.round(Dimensions.get('window').width);


    return (
        <Stack.Navigator

            initialRouteName="Feed">
            {/* {addProductRoutes(Stack)} */}
            <Stack.Screen
                name="Feed"
                options={{
                    title:  'Devx Learning',
                    headerTitleStyle: {
                        fontSize: 18,
                        fontStyle:'italic'
                    },
                    headerStyle:{
                    //    backgroundColor:'lightblue'
                    },
                    headerLeft: () => {
                        return (
                            !isShowSearch?
                                (<TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                                    <Icon style={searchStyles.barsIcon} name="bars" size={25} color={isDarkTheme?'#fff':"#333"}/>
                                </TouchableOpacity>)
                            :
                                (<TouchableOpacity onPress={()=>setShowSearch(false)}>
                                    <FeatureIcon style={searchStyles.barsIcon} name="arrow-left" size={25} color={isDarkTheme?'#fff':"#333"}/>
                                </TouchableOpacity>)
                        );
                    },
                    headerRight: () =>{
                        return(
                            !isShowSearch?
                                (
                                    <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                                        <Icon style={searchStyles.barsIcon} name="search" size={20} color={isDarkTheme?'#fff':"#333"}/>
                                    </TouchableOpacity>
                                ):
                                (
                                    // <TextInput style={searchStyles.searchBar} placeholder="Search ..." />
                                    <Searchbar
                                        placeholder="Search"
                                        onChangeText={(value)=>{setSearchValue(value);console.log(searchValue);}}
                                        value={searchValue}
                                        style={{width:screenWidth-80,marginRight:20,elevation:1}}
                                    />
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
            <Stack.Screen
                options={{headerShown: false}}
                name="Search"
                component={DevxSearch}
            />
             <Stack.Screen
                 options={{headerShown: true}}
                name="SearchResult"
                component={CxDevxSearchResult}
            />
            <Stack.Screen
                options={{headerShown: false}}
                name="InstructorProfile"
                component={CxDevxInstructorProfile}
                />
        </Stack.Navigator>
    );
};
export default HomeStack;
