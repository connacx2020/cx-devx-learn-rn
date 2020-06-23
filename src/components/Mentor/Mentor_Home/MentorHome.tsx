import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { MentorStackNavProps } from '../../../common/ultis/ParamLists/MentorParamList';
import { useTheme } from '@react-navigation/native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Title,Chip} from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';

function CxDevxMentorHome({ navigation }: MentorStackNavProps<"MentorHome">) {
    const { colors } = useTheme();
    const [opened,setOpenPopUpMenus] = React.useState<Boolean>(false);
    const [clickedChipName,setClickedChipName] = React.useState<String>('');

    const selectChipHandler = (clickChip:string) =>{
        if(clickedChipName === clickChip){
            return true
        }else if(clickedChipName === clickChip){
            return true
        }else if(clickedChipName === clickChip){
            return true
        }else if(clickedChipName === clickChip){
            return true
        }
        return false;
    }

    const onBackdropPress = () =>{
        setOpenPopUpMenus(false);
    }

    const onTriggerPress = () =>{
        setOpenPopUpMenus(true);
    }


    return (
     <MenuProvider>
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Title style={{textAlign:'center'}}>Welcome <Title style={{fontWeight:'bold'}}>Oak</Title>! I'm <Title style={{fontWeight:'bold'}}>Josh</Title>, your Personal mentor! How are you feeling Today?</Title>

                <View style={styles.header_feel}>
                    <Chip style={{marginRight:10,marginVertical:5}} icon="fire" onPress={() => setClickedChipName('moti')} selected={selectChipHandler('moti')}>Motivated</Chip>
                    <Chip style={{marginRight:10,marginVertical:5}} icon="emoticon-cool-outline" onPress={() =>setClickedChipName('ready')} selected={selectChipHandler('ready')}>Ready</Chip>
                    <Chip style={{marginRight:10,marginVertical:5}} icon="snowflake" onPress={() => setClickedChipName('lazy')} selected={selectChipHandler('lazy')}>Lazy</Chip>
                    <Chip style={{marginRight:10,marginVertical:5}} icon="emoticon-cry" onPress={() => setClickedChipName('depression')} selected={selectChipHandler('depression')}>Depressed</Chip>
                </View>

                <Menu
                    style={styles.popup_menus}
                    opened={opened}
                    onBackdropPress={() => onBackdropPress()}
                    onSelect={value => setOpenPopUpMenus(false)}
                >
                    <MenuTrigger
                        onPress={() => onTriggerPress()}
                        text=''>
                            <MCIcon name={"dots-vertical"} size={25} color={"#333"} />
                    </MenuTrigger>
                    <MenuOptions
                        optionsContainerStyle={{ marginTop: 25 }}
                    >
                        <MenuOption value={1}>
                            <TouchableOpacity onPress={()=>navigation.navigate("MentorSetting")}>
                                <Text style={{padding:5}}><MCIcon name={"settings"} size={15} color={"#333"} />&emsp;Setting</Text>
                            </TouchableOpacity>
                        </MenuOption>
                        <MenuOption value={2}>
                            <TouchableOpacity onPress={()=>console.log("Press In Menus TouchOpacity")}>
                                <Text style={{padding:5}}><MCIcon name={"information"} size={15} color={"#333"} />&emsp;Help</Text>
                            </TouchableOpacity>
                        </MenuOption>
                    </MenuOptions>
                </Menu>

            </View>
            <View style={styles.body}>
                
            </View>

        </View>
      </MenuProvider>
    )
}

export default CxDevxMentorHome;
