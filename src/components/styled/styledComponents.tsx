import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text, View, Image } from 'react-native'
import { Button } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { CxStyTouchableOpacity } from './elements/buttons'
import { CxStyCard } from './elements/cards'
import { CxButtonText, CxStyTitle, CxStyText } from './elements/texts'
import { CxStyVView, CxStyMainView, CxStyHView } from './elements/views'
import theme, { themeModes } from './theme/theme'
import Icon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CxStyImage } from './elements/images'

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
                    <View style={{ alignSelf: 'flex-start', padding: 12, backgroundColor: 'blue', borderRadius: 5 }} >
                        <CxButtonText onPress={toggleTheme}>switch theme!</CxButtonText>
                    </View>
                </CxStyTouchableOpacity>

                <CxStyText>Cards</CxStyText>
                <CxStyCard>
                    <CxStyImage
                        testID="imgID"
                        source={{
                            uri: 'https://cx-devx-cdn-uploaded-images.s3.ap-southeast-1.amazonaws.com/topic-logos/0f30104a-c046-4ad1-b08e-7dcae849af37.jpeg'
                        }} />

                    <CxStyHView justifyType="end" alignType="center">
                        <CxStyVView justifyType="center"  >
                            <CxStyText>Graphql Course</CxStyText>
                            <CxStyText>3 $</CxStyText>
                        </CxStyVView>
                        <CxStyTouchableOpacity>
                            <View style={{ padding: 8, backgroundColor: 'blue', borderRadius: 5 }} >
                                <CxButtonText>Enroll</CxButtonText>
                            </View>
                        </CxStyTouchableOpacity>
                    </CxStyHView>
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
        </ThemeProvider >
    )
}

export default CxStyledComponents
