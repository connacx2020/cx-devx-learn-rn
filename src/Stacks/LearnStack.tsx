import React, { useContext, useState } from "react";
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
                                    <TouchableOpacity onPress={() => navigation.navigate('Search', {searchFor: 'course'})}>
                                        <Icon style={searchStyles.barsIcon} name="search" size={20} color={isDarkTheme ? '#fff' : "#333"} />
                                    </TouchableOpacity>
                                ) :
                                (
                                    // <TextInput style={searchStyles.searchBar} placeholder="Search ..." />
                                    <Searchbar
                                        placeholder="Search"
                                        onChangeText={(value) => { setSearchValue(value); console.log(searchValue); }}
                                        value={searchValue}
                                        style={{ width: screenWidth - 80, marginRight: 20, elevation: 1 }}
                                    />
                                )

                        )
                    }
                }}
                component={CxDevXLearn}
            />
        </Stack.Navigator>
    );
};
export default LearnStack;
