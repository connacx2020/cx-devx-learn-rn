import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import { saveMentorStep } from '../../../../common/redux/redux-actions';
import { store } from "../../../../common/redux";
import { MentorTopTabNavProps } from '../../../../common/ultis/ParamLists/MentorParamList';
import { styles } from './styles';

function CxDevxMentorStep3({ route }: MentorTopTabNavProps<"MentorStep3">) {
    const { colors } = useTheme();
    useFocusEffect(() => {
        store.dispatch(saveMentorStep(route.name));
    })
    let initialToBe: any = [
    ];
    const [isModalVisible, setModalVisible] = React.useState<any>(false);
    let [toBeItem, setToBeItem] = React.useState<String>('');
    let [toBeList, setToBeList] = React.useState<any[]>(initialToBe);
    let navigation = useNavigation();


    let toBeListData = [
        {
            label: 'Full-Stack web developer',
            value: 'Full-Stack web developer',
        }, {
            label: 'Mobile developer',
            value: 'Mobile developer',
        }, {
            label: 'Data Scientist',
            value: 'Data Scientist',
        }, {
            label: 'Marketing Manager',
            value: 'Marketing Manager'
        }, {
            label: 'Bussiness Analysis',
            value: 'Bussiness Analysis'
        }
    ];

    const addGoalHandler = () => {
        let temp = { "value": toBeItem };
        toBeList.push(temp);
        setToBeList(toBeList);
        ToastAndroid.show(toBeItem + " have added in your goal!", ToastAndroid.SHORT);
        setToBeItem('');
        setModalVisible(false);
    }

    const deleteGoalHander = (value: string) => {
        let result = toBeList.filter((item: any) => {
            return item.value !== value
        });
        toBeList = result;
        setToBeList(toBeList)
        ToastAndroid.show(value + " have deleted in your skill!", ToastAndroid.SHORT);
    };

    const _renderToDoList = (item: any) => {
        return (
            <View style={styles.render_goal_item_field}>
                <Text style={styles.goal_name_txt}>{item.value}</Text>

                <TouchableOpacity style={styles.delete_icon_field}
                    onPress={() => deleteGoalHander(item.value)}
                >
                    <MCIcon name={"delete"} size={20} color={"tomato"} />
                </TouchableOpacity>

            </View>
        )
    }





    return (
        <View style={styles.wrapper}>

            <View style={styles.row}>
                <Text style={styles.my_goal_txt}>Career Goal</Text>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    <MCIcon name={"plus-circle"} size={30} color={"#2541B2"} />
                </TouchableOpacity>
            </View>

            <View style={styles.goal_field}>
                <View style={styles.goal_render_items_field}>
                    <Text style={styles.my_goal_txt}>My Goals</Text>
                    {
                        toBeList.map((item: any) => _renderToDoList(item))
                    }
                </View>
            </View>
            {
                toBeList.length > 0 ? <TouchableOpacity
                    style={{ backgroundColor: '#0474D6', padding: 10 }}
                    onPress={() => { navigation.navigate("MentorHome"); ToastAndroid.show("Done", ToastAndroid.SHORT) }}
                >
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Done</Text>
                </TouchableOpacity> :
                    <TouchableOpacity
                        style={{ backgroundColor: 'gray', padding: 10 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff' }}>Done</Text>
                    </TouchableOpacity>
            }


            <Modal
                style={{ justifyContent: 'center', alignItems: 'center' }}
                isVisible={isModalVisible}
                onBackButtonPress={() => setModalVisible(false)}
            >
                <View style={styles.form_filed} >
                    <Text style={styles.my_goal_txt}>What you want to be?</Text>
                    <DropDownPicker
                        zIndex={2}
                        items={toBeListData}
                        placeholder="Select, what you want to be"
                        defaultIndex={0}
                        containerStyle={{ height: 35, width: 220 }}
                        onChangeItem={(item: any) => setToBeItem(item.value)}
                    />
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', height: 50, marginTop: 5, zIndex: -1 }}>
                        <Button mode="outlined" labelStyle={{ color: '#333', fontWeight: '500', fontSize: 12 }} style={{ marginRight: 10 }} onPress={() => setModalVisible(false)}>
                            Cancel
                          </Button>
                        <Button mode="contained" color="#12ffd3" labelStyle={{ fontWeight: '500', fontSize: 12 }} onPress={addGoalHandler}>
                            Submit
                          </Button>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

export default CxDevxMentorStep3;
