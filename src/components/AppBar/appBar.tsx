import { useQuery } from "@apollo/react-hooks";
import { Picker } from "@react-native-community/picker";
import { DrawerActions, useTheme } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { getAllTopicsSchema } from "../../common/graphQL";
import { styles } from "./styles";

export const CxAppBar: FC<any> = (props) => {
    const { navigation, previous, title } = props;
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [topics, setTopics] = useState([] as any);
    const { colors } = useTheme();
    const getAllTopicsQuery = useQuery(getAllTopicsSchema, { notifyOnNetworkStatusChange: true });

    const handleBackPress = () => {
        if (showFilter) {
            setShowFilter(false);
            setSelectedValue('');
            props.setSelectedTopic('');
        }
        else {
            setShowSearch(false);
            navigation.goBack;
        }
    }

    const handleItemPress = (item: string) => {
        if (item.toLowerCase() === 'filter') {
            setShowFilter(true);
        } else {
            setShowSearch(true);
            navigation.navigate('SearchPost', { searchFor: 'post' });
        }
    }

    const handlePickerValueChange = (itemValue: any, itemIndex: any) => {
        setSelectedValue(itemValue);
        props.setSelectedTopic(itemValue);
    }

    useEffect(() => {
        getAllTopicsQuery?.data && setTopics(getAllTopicsQuery.data.findAllTopics);
    }, [getAllTopicsQuery.data])

    return (
        !showFilter && !showSearch ?
            <Appbar.Header>
                {
                    previous ?
                        <Appbar.BackAction onPress={() => navigation.goBack} /> :
                        <Appbar.Action icon="menu" color="white" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                }
                <Appbar.Content title={title} />
                <Appbar.Action icon="filter"
                    onPress={() => handleItemPress('filter')} />
                <Appbar.Action icon="magnify" onPress={() => handleItemPress('search')} />
            </Appbar.Header> :
            <Appbar>
                <Appbar.BackAction onPress={handleBackPress} />
                <Picker
                    testID='pickerFilter'
                    style={styles.pickerContainer}
                    mode='dropdown'
                    selectedValue={selectedValue}
                    onValueChange={handlePickerValueChange}
                    accessibilityHint="Select Topic to Filter"
                >
                    <Picker.Item label="Filter by Topic" value="" color="#A4A2A2" />
                    {
                        topics?.map((topic: any) => <Picker.Item label={topic.title} value={topic.id} />)
                    }
                </Picker>
                <Appbar.Action icon="filter" color="white" />
            </Appbar>
    );
} 