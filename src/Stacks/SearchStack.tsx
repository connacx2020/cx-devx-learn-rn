import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { Center } from "./Center";
import {  TouchableOpacity,Image } from "react-native";
import { SearchParamList } from "../ultis/ParamLists/SearchParamList";
import Search from '../components/Search/Search';

import { styles } from './styles/header';

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();


 const SearchStack: React.FC<SearchStackProps> = ({}) => {
//   const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Search">
      {/* {addProductRoutes(Stack)} */}
      <Stack.Screen
        name="Search"
        options={{
            title: 'Devx Learning',
            headerTitleStyle: {
                  fontSize:25
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
                      source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgOjtYQ5PrC1mO_8ZQNI6NKTU1fCCmMNUljmvfpGcCp3qC_YMQ&usqp=CAU'}}
                  />
                </TouchableOpacity>
              );
            }
          }}
        component={Search}
      />
    </Stack.Navigator>
  );
};
export default SearchStack;
