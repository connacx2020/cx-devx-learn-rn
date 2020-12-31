import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "../common/ultis/ParamLists/HomeParamList";
import DevxSearch from "../components/Search/DevxSearch";
import { TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatureIcon from 'react-native-vector-icons/Feather';
import { Searchbar } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { searchStyles } from './styles/searchBar';
import { AuthContext } from "../Providers/AuthProvider";
import CxDevXFeed from "../components/Feed/Feed";
import CxPostDetail from "../components/PostDetail/PostDetail";

interface HomeStackProps { }

const Stack = createStackNavigator<HomeParamList>();

const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const navigation = useNavigation();
    const { isDarkTheme } = useContext(AuthContext);
    const [isShowSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const screenWidth = Math.round(Dimensions.get('window').width);

    return (
        <Stack.Navigator initialRouteName="Feed">
            <Stack.Screen
                name="Feed"
                options={{
                    title: 'Feeds',
                    headerTitleStyle: {
                        fontSize: 25
                    },
                    headerLeft: () => {
                        return (
                            !isShowSearch ?
                                (<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                    <Icon style={searchStyles.barsIcon} name="bars" size={25} color={isDarkTheme ? '#fff' : "#333"} />
                                </TouchableOpacity>)
                                :
                                (<TouchableOpacity onPress={() => setShowSearch(false)}>
                                    <FeatureIcon style={searchStyles.barsIcon} name="arrow-left" size={25} color={isDarkTheme ? '#fff' : "#333"} />
                                </TouchableOpacity>)
                        );
                    },
                    headerRight: () => {
                        return (
                            !isShowSearch ?
                                (
                                    <TouchableOpacity onPress={() => navigation.navigate('Search', { searchFor: 'post' })}>
                                        <Icon style={searchStyles.barsIcon} name="search" size={20} color={isDarkTheme ? '#fff' : "#333"} />
                                    </TouchableOpacity>
                                ) :
                                (
                                    // <TextInput style={searchStyles.searchBar} placeholder="Search ..." />
                                    <Searchbar
                                        placeholder="Search"
                                        onChangeText={(value) => { setSearchValue(value); console.log(searchValue); }}
                                        value={searchValue}
                                        style={{ elevation: 1 }}
                                    />
                                )

                        )
                    }
                }}
                component={CxDevXFeed}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Search"
                component={DevxSearch}
            />
            <Stack.Screen
                options={{ headerShown: true }}
                name="PostDetail"
                component={CxPostDetail} />
        </Stack.Navigator>
    );
};
export default HomeStack;
