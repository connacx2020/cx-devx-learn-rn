import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TopicParamList } from "../common/ultis/ParamLists/TopicParamList";
import Topic from '../components/Topic/Topic';
import CxDevxChildTopic from "../components/Topic/ChildTopics";
import { TouchableOpacity, Dimensions } from "react-native";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { searchStyles } from './styles/searchBar';
import { AuthContext } from "../Providers/AuthProvider";
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatureIcon from 'react-native-vector-icons/Feather';
import { Searchbar } from 'react-native-paper';

interface HomeStackProps { }

const Stack = createStackNavigator<TopicParamList>();

const TopicStack: React.FC<HomeStackProps> = ({ }) => {
  const navigation = useNavigation();
  const { isDarkTheme } = useContext(AuthContext);
  const [isShowSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <Stack.Navigator initialRouteName="Topics">
      <Stack.Screen
        name="Topics"
        options={{
          title: 'Topics',
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
                  <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
        component={Topic}
      />
      <Stack.Screen
        name="ChildTopics"
        options={{
          headerShown: true, headerTitleStyle: {
            fontSize: 25
          }
        }}
        component={CxDevxChildTopic}
      />
    </Stack.Navigator>
  );
};
export default TopicStack;
