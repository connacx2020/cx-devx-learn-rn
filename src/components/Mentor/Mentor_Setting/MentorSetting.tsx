import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MentorStackNavProps } from '../../../common/ultis/ParamLists/MentorParamList';
import { useTheme } from '@react-navigation/native';
import { Title } from 'react-native-paper';

import { CourseDetailTabs } from '../MentorStepTabs/MentorStepTabs'
import { MentorParamList } from '../../../common/ultis/ParamLists/MentorParamList';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { store } from "../../../common/redux";

function CxDevxMentorSetting({ navigation,route }: MentorStackNavProps<"MentorSetting">) {
    const { colors } = useTheme();
    const [mentorstep,setMentorStep] = React.useState<any>('');
    
       

        const getMentorStep = useSelector((state: any) => state.mentorStepInfo.ms_route_name);
        useEffect(()=>{
            setMentorStep(getMentorStep)
        },[getMentorStep])
   
    return (
        <View style={styles.wrapper}>
            <View style={styles.navbar}>
                <Title>
                    {
                        mentorstep === "MentorStep1"? "Where I am now?": mentorstep === "MentorStep2"? "My interests": "What I want to be"
                    }
                </Title>
            </View>
            
            <View style={styles.body}>
                <CourseDetailTabs/> 
            </View>

        </View>
    )
}

export default CxDevxMentorSetting;
