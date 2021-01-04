import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "../common/ultis/ParamLists/HomeParamList";
import DevxSearch from "../components/Search/DevxSearch";
import { AuthContext } from "../Providers/AuthProvider";
import CxDevXFeed from "../components/Feed/Feed";
import CxPostDetail from "../components/PostDetail/PostDetail";
import { CxAppBar } from "../components/AppBar/appBar";
import { useNavigation } from "@react-navigation/native";

interface HomeStackProps { }
const Stack = createStackNavigator<HomeParamList>();

const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const navigation = useNavigation();
    const { isDarkTheme } = useContext(AuthContext);
    const [selectedTopic, setSelectedTopic] = useState('');
    console.log("selectedTopics:", selectedTopic);

    return (
        <Stack.Navigator initialRouteName={"Home"}
            screenOptions={{
                header: (props) => {
                    return (
                        <CxAppBar {...props} title='Feeds' setSelectedTopic={(selected: string) => setSelectedTopic(selected)} />
                    )
                }
            }}>

            <Stack.Screen
                options={{ headerShown: true }}
                name="Home"
            >
                {props => <CxDevXFeed {...props} selectedTopic={selectedTopic} />}
            </Stack.Screen>
            <Stack.Screen
                options={{ headerShown: true }}
                name="SearchPost"
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
