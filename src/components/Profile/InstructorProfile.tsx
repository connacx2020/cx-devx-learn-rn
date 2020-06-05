import React from 'react';
import { View,Text,Button,ScrollView,Image,TouchableOpacity,ImageBackground,FlatList,Linking,} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SearchItemCoverLeft } from '../SearchResultItem/CoverLeftItem';
import { useNavigation,useTheme } from '@react-navigation/native';


import { styles } from './instructor_styles';

export const InstructorProfile: React.FC = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const courseData = [
        {
            img:
                'https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg',
            title: 'GraphQL Advanced Course',
            rate: 4.5,
            likes: 1000,
            enrolled: 531,
        },
        {
            img:
                'https://miro.medium.com/max/2880/1*xcDT-neKHP7E3quS9n30gw.png',
            title: 'React Hooks Course',
            rate: 5,
            likes: 1500,
            enrolled: 321,
        },
        {
            img:
                'https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png',
            title: 'Nodejs Advanced Course',
            rate: 4,
            likes: 784,
            enrolled: 212,
        },
        {
            img: 'https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg',
            title: 'React Native With Typescript',
            rate: 4,
            likes: 1000,
            enrolled: 651,
        },
        {
            img:
                'https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png',
            title: 'GraphQL with Neo4j  Course',
            rate: 5,
            likes: 1000,
            enrolled: 531,
        },
    ];
    return (
        <ScrollView style={[styles.wrapper,{backgroundColor:colors.background}]}>
            <ImageBackground
                testID="bgID"
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
                            testID="iconID"
                            name={'arrow-left'}
                            size={25}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <View style={styles.avator_container}>
                        <Image
                            testID="avatarID"
                            style={styles.avatar}
                            source={{
                                uri:
                                    'https://avatars0.githubusercontent.com/u/22853376?s=400&u=eb6a624d15b9a564680c3aac4c1943e25ffe45cb&v=4',
                            }}
                        />
                    </View>
                </View>
                <View style={styles.header_right}>
                    <Text testID="nameID" style={styles.user_name}>Dr.Osk Soe Kyaw</Text>
                    <Text testID="emailID" style={styles.user_email}>
                        dr.osksoekyaw@gmail.com
                    </Text>
                    <View style={styles.connect_follow_field}>
                        <TouchableOpacity testID="connectBtnID" style={styles.connect_follow_btn}>
                            <Text style={styles.connect_follow_txt}>
                                Connect
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity testID="followBtnID" style={styles.connect_follow_btn}>
                            <Text>Follow</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.social_field}>
                        <TouchableOpacity
                            testID="githubImgBtnID"
                            onPress={()=>Linking.openURL('https://github.com/oaksoe')} 
                            style={styles.icon_field}>
                            <Image
                                style={styles.icon}
                                source={require('../../asset/icons/github.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            testID="fbImgBtnID"
                            onPress={()=>Linking.openURL('https://www.facebook.com/profile.php?id=100012330697064')}
                            style={styles.icon_field}>
                            <Image
                                style={styles.icon}
                                source={require('../../asset/icons/facebook.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                             testID="linkedInImgBtnID"
                             onPress={()=>Linking.openURL('https://www.linkedin.com/in/wai-min-5679a81aa/')} 
                             style={styles.icon_field}>
                            <Image
                                style={styles.icon}
                                source={require('../../asset/icons/linkedin.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flex: 1 }}>
                <View style={styles.about_field}>
                    <Text testID="aboutID" style={[styles.about_txt,{color:colors.text}]}>About</Text>
                    <Text testID="aboutContentID" style={[styles.about_context_txt,{color:colors.text}]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum neque nesciunt soluta odit est reprehenderit
                        ducimus praesentium,
                    </Text>
                </View>
                <View style={styles.profile_content}>
                    <FlatList
                        testID="flatListID"
                        data={courseData}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item, index }) => {
                            return (
                                <SearchItemCoverLeft
                                    img={item.img}
                                    title={item.title}
                                    rate={item.rate}
                                    likes={item.likes}
                                    enrolled={item.enrolled}
                                />
                            );
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
