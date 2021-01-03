import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { CxStyTouchableOpacity } from './elements/buttons'
import { CxStyCard } from './elements/cards'
import { CxButtonText, CxStyTitle, CxStyText } from './elements/texts'
import { CxStyMainView } from './elements/views'
import theme, { themeModes } from './theme/theme'
import HomeStack from '../../Stacks/HomeStack';
import LearnStack from '../../Stacks/LearnStack';
import TopicStack from '../../Stacks/TopicStack';
import MentorStack from '../../Stacks/MentorStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tabs = createBottomTabNavigator();

function CxStyledComponents() {

    const [currentTheme, setCurrentTheme] = React.useState(themeModes[0]);

    const toggleTheme = () => {
        const newTheme = currentTheme === themeModes[0] ? themeModes[1] : themeModes[0];
        setCurrentTheme(newTheme);
    };


    return (
        <ThemeProvider theme={theme(currentTheme)}>
            <CxStyMainView>
                <CxStyText>Buttons</CxStyText>
                <CxStyTouchableOpacity>
                    <CxButtonText onPress={toggleTheme}>switch theme!</CxButtonText>
                </CxStyTouchableOpacity>

                <CxStyText>Cards</CxStyText>
                <CxStyCard>
                    <CxStyTitle>card</CxStyTitle>
                </CxStyCard>

                <View style={{ height: 70 }}>
                    <CxStyText>Tabs</CxStyText>
                    <Tabs.Navigator
                        initialRouteName="Topic"
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName: string = "";

                                if (route.name === "Home") {
                                    iconName = "home";
                                } else if (route.name === "Mentor") {
                                    return <MCIcon name={"teach"} size={size} color={color} />;
                                } else if (route.name === "Learn") {
                                    iconName = "code"
                                } else if (route.name === "Topic") {
                                    iconName = "lightbulb-o"
                                }

                                return <Icon name={iconName} size={size} color={color} />;
                            }
                        })}
                        tabBarOptions={{
                            activeTintColor: "tomato",
                            inactiveTintColor: "gray",
                            style: {
                                position: 'relative',
                                backgroundColor: 'red'
                            }
                        }}


                    >
                        <Tabs.Screen name="Home" component={CxStyText}
                            options={{
                                tabBarVisible: true
                            }}
                        />


                        <Tabs.Screen name="Mentor" component={CxStyText} />
                        <Tabs.Screen name="Learn" component={CxStyText}
                            options={{
                                tabBarVisible: true
                            }} />
                        <Tabs.Screen name="Topic" component={CxStyText}
                            options={{
                                tabBarVisible: true
                            }} />

                    </Tabs.Navigator>
                </View>
            </CxStyMainView>
        </ThemeProvider>
    )
}

export default CxStyledComponents
