import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { MentorStackNavProps } from '../../../common/ultis/ParamLists/MentorParamList';
import { useTheme } from '@react-navigation/native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Title, Chip, Divider } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from '@react-native-community/viewpager';
import ImageZoom from 'react-native-image-pan-zoom';
import { Checkbox } from 'react-native-paper';

import { styles } from './styles';
import { SearchItemCoverLeft } from '../../SearchResultItem/CoverLeftItem';
import { Course } from '../../../models';
import { useSelector } from 'react-redux';
import { AuthUserInfo } from '../../../common/redux/redux-actions';

function CxDevxMentorHome({ navigation }: MentorStackNavProps<"MentorHome">) {
    const { colors } = useTheme();
    const [opened, setOpenPopUpMenus] = React.useState<Boolean>(false);
    const [clickedChipName, setClickedChipName] = React.useState<String>('moti');
    const userInfo: AuthUserInfo = useSelector((state: any) => state.authUserInfo);


    const [total, setTotal] = React.useState(0);


    let viewpager = React.useRef<any>();

    const courseArr = [
        {
            id: "1",
            title: "Basic Javascript course",
            photoUrl: "",
            enrolled: "",
            price: 5,
            rating: 2.3
        },
        {
            id: "2",
            title: "NodeJS & Mongo Course",
            photoUrl: "",
            enrolled: "",
            price: 5,
            rating: 4.1
        },
        {
            id: "3",
            title: "Angular Course",
            photoUrl: "",
            enrolled: "",
            price: 7,
            rating: 4.2
        },
        {
            id: "4",
            title: "React Course",
            photoUrl: "",
            enrolled: "",
            price: 8,
            rating: 4.2
        },
    ];
    const [selected, setSelected] = React.useState<any[]>(courseArr);

    React.useEffect(() => {
        calculateTotal()
    }, [selected])

    const selectChipHandler = (clickChip: string) => {
        if (clickedChipName === clickChip) {
            return true
        } else if (clickedChipName === clickChip) {
            return true
        } else if (clickedChipName === clickChip) {
            return true
        } else if (clickedChipName === clickChip) {
            return true
        }
        return false;
    }

    const onBackdropPress = () => {
        setOpenPopUpMenus(false);
    }

    const onTriggerPress = () => {
        setOpenPopUpMenus(true);
    }

    const onSelected = (value: any) => {
        setSelected(selected.concat(value));
    }

    const removeSelected = (value: any) => {
        setSelected(selected.filter((item: any) => item.id !== value.id));
    }

    const calculateTotal = () => {
        let result = selected.map(res => res.price)
        result.length > 0 ? setTotal(result.reduce((accumulator, currentValue) => accumulator + currentValue)) : setTotal(0)
    }

    const buyCourseBundle = () => {
        console.log(
            {
                userID: userInfo.userID,
                courseBundle: selected.map(res => res.id)
            }
        )
    }

    return (
        <MenuProvider>
            <View style={styles.wrapper}>

                <View style={{ flexDirection: 'row', elevation: 1, padding: 5, justifyContent: 'space-between' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, flex: 10, }}>
                        Welcome <Text style={{fontWeight:'bold'}}>{userInfo.name}</Text>! I'm <Text style={{fontWeight:'bold'}}>Josh</Text> your Personal mentor! How are you feeling Today?
                    </Text>
                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center', padding: 5 }} onPress={() => navigation.navigate("MentorSetting")}>
                        <MaterialIcon name={"mode-edit"} size={25} color={"#333"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.header_feel}>
                    <Chip style={{ marginRight: 10, marginVertical: 5 }} icon="fire" onPress={() => setClickedChipName('moti')} selected={selectChipHandler('moti')}>Motivated</Chip>
                    <Chip style={{ marginRight: 10, marginVertical: 5 }} icon="emoticon-cool-outline" onPress={() => setClickedChipName('ready')} selected={selectChipHandler('ready')}>Ready</Chip>
                    <Chip style={{ marginRight: 10, marginVertical: 5 }} icon="snowflake" onPress={() => setClickedChipName('lazy')} selected={selectChipHandler('lazy')}>Lazy</Chip>
                    <Chip style={{ marginRight: 10, marginVertical: 5 }} icon="emoticon-cry" onPress={() => setClickedChipName('depression')} selected={selectChipHandler('depression')}>Depressed</Chip>
                </View>

                <Divider/>

                <View style={styles.body}>
                    {
                        clickedChipName === "moti" && <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>

                            <ViewPager style={{ flex: 1 }} initialPage={0} ref={viewpager} >

                                <ScrollView key="1" showsVerticalScrollIndicator={false}>
                                    <Image source={require('../../../asset/LearningPath.png')} resizeMode="contain" style={{ alignSelf: 'center', width: Dimensions.get("window").width - 20 }} />
                                </ScrollView>

                                <ScrollView key="2" style={{ flexDirection: 'column' }}>
                                    <View>

                                        <View style={{ backgroundColor: 'gray', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                            <Title style={{ color: 'white' }}>
                                                Full-Stack web developer
                                        </Title>

                                        </View>

                                        <FlatList
                                            style={{ flex: 1 }}
                                            data={courseArr}
                                            renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>

                                                <View style={{ alignSelf: 'center' }}>
                                                    <Checkbox
                                                        status={selected.filter(res => res.id === item.id).length > 0 ? 'checked' : 'unchecked'}
                                                        onPress={() => { selected.filter(res => res.id === item.id).length > 0 ? removeSelected(item) : onSelected(item) }}
                                                    />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <SearchItemCoverLeft
                                                        id={item.id}
                                                        photoUrl={item.photoUrl}
                                                        title={item.title}
                                                        rating={item.rating}
                                                        enrolled={item.enrolled}
                                                        price={item.price}
                                                    />
                                                </View>
                                            </View>
                                            }
                                        />
                                        {selected.length > 0 &&
                                            <TouchableOpacity onPress={buyCourseBundle} style={{ backgroundColor: '#0474D6', justifyContent: 'center', padding: 10 }}>
                                                <Text style={{ color: '#fff', textAlign: 'center' }}>
                                                    Buy {selected.length > 0 && selected.length > 1 && `this bundle: ${total} $`}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </ScrollView>
                            </ViewPager>
                        </View>
                    }
                    {
                        clickedChipName === "ready" && <Text>Ready</Text>
                    }
                    {
                        clickedChipName === "lazy" && <Text>Lazy</Text>
                    }
                    {
                        clickedChipName === "depression" && <Text>Depressed</Text>
                    }
                </View>

            </View>
        </MenuProvider>
    )
}

export default CxDevxMentorHome;
