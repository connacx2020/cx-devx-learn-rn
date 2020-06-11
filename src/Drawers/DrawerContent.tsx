import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Avatar
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from '../Providers/AuthProvider';

export function DrawerContent(props:any){
    const paperTheme = useTheme();
    const { logout,toggleTheme } = React.useContext(AuthContext)


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <TouchableRipple onPress={()=>props.navigation.navigate("UserProfile")}>
                                <Avatar.Image
                                    source={{
                                        uri:"https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4"
                                    }}
                                    size={50}
                                />
                            </TouchableRipple>
                            <View style={{marginLeft:15,flexDirection:'column'}}>
                                <Title style={styles.title}>Osk Soe Kyaw</Title>
                                <Caption style={styles.caption}>@devx</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption ]}>65</Paragraph>
                                <Paragraph style={styles.caption}>Following</Paragraph>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption ]}>15</Paragraph>
                                <Paragraph style={styles.caption}>Follower</Paragraph>
                            </View>
                        </View>
                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color,size})=>(
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={()=>{props.navigation.navigate('Home')}}
                        />
                        {/* <DrawerItem
                            icon={({color,size})=>(
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={()=>props.navigation.navigate("Profile")}
                        /> */}
                        <DrawerItem
                            icon={({color,size})=>(
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={()=>{}}
                        />
                        <DrawerItem
                            icon={({color,size})=>(
                                <Icon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={()=>{}}
                        />
                        <DrawerItem
                            icon={({color,size})=>(
                                <Icon
                                    name="heart-multiple-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Favorite"
                            onPress={()=>{}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={()=>toggleTheme()}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>

                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color,size})=>(
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={()=>{props.navigation.navigate("Logout");logout()}}
                    />
            </Drawer.Section>
        </View>

    )
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
