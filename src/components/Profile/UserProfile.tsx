import React from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity,ImageBackground} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation,useTheme } from '@react-navigation/native';
import { styles } from './user_styles';

export const UserProfile:React.FC = () =>{
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <ScrollView style={[styles.wrapper,{backgroundColor:colors.background}]}>
            <ImageBackground
                source={{
                    uri:
                       "https://cdn4.vectorstock.com/i/1000x1000/77/88/poligonal-background-of-rhombus-gradient-colors-vector-20407788.jpg"
                }}
                style={styles.header}>
                <View style={styles.header_left}>
                    <TouchableOpacity
                        style={styles.back_arrow}
                        onPress={() =>navigation.goBack()}>
                        <FeatherIcon
                            name={'arrow-left'}
                            size={25}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <View style={styles.avator_container}>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri:
                                    'https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4',
                            }}
                        />
                    </View>
                </View>
                <View style={styles.header_right}>
                    <Text style={styles.user_name}>Dr.Osk Soe Kyaw</Text>
                    <Text style={styles.user_email}>
                        dr.osksoekyaw@gmail.com
                    </Text>
                    <View style={styles.devx_view_field}>
                        <TouchableOpacity style={styles.devx_view_btn}>
                            <Text>View on Devx</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.body}>
                <View style={{borderWidth:1}}>
                    <Text style={{fontSize:20,padding:10}}>About Devx Learning</Text>
                </View>
                
            </View>
        </ScrollView>
    );
};
