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
import DevxSearch from "../components/Search/DevxSearch";
import { CxAppBar } from "../components/AppBar/appBar";

interface TopicStackProps { }

const Stack = createStackNavigator<TopicParamList>();

const TopicStack: React.FC<TopicStackProps> = ({ }) => {
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
          header: (props) => {
            return (
                <CxAppBar {...props} title='Topics' />
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchTopic"
        component={DevxSearch}
      />
    </Stack.Navigator>
  );
};
export default TopicStack;
