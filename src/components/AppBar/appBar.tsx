import { DrawerActions } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { TextInput } from "react-native";
import { Appbar } from "react-native-paper";

export const CxAppBar: FC<any> = ({ navigation, previous, title, setShowFilter, setShowSearch, isShowFilter, isShowSearch }) => {
    const [placeholder, setPlaceholder] = useState('');
    return (
        !isShowFilter && !isShowSearch ?
            <Appbar.Header>
                {
                    previous ?
                        <Appbar.BackAction onPress={() => navigation.goBack} /> :
                        <Appbar.Action icon="menu" color="white" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                }
                <Appbar.Content title={title} />
                <Appbar.Action icon="filter"
                    onPress={() => {
                        setShowFilter(true);
                        setPlaceholder('Filter');
                    }} />
                <Appbar.Action icon="magnify" onPress={() => { setShowSearch(true); setPlaceholder('Search here'); }} />
            </Appbar.Header> :
            <Appbar style={{ margin: 0, padding: 0 }}>
                <Appbar.BackAction onPress={() => { setShowSearch(false); setShowFilter(false); }} />
                <TextInput autoFocus placeholder={placeholder} placeholderTextColor="#D3CFCF" style={{ color: 'white', fontSize: 18 }} />
            </Appbar>
    );
} 