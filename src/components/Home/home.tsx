// import React from 'react';
// import {View, Text, Image} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/AntDesign';

// import CxDevxFeed from '../Feed/Feed';
// import CxDevxLearn from '../Learn/Learn';
// import CxDevxSearch from '../Search/Search';
// import CxDevxTopic from '../Topic/Topic';

// import {styles} from './styles';
// const Tab = createBottomTabNavigator();

// const CxDevxLogin: React.FC<{navigation: any}> = ({navigation}) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Dexv Learing</Text>
//                 <Image
//                     style={styles.profileImg}
//                     source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgOjtYQ5PrC1mO_8ZQNI6NKTU1fCCmMNUljmvfpGcCp3qC_YMQ&usqp=CAU'}}
//                 />
//             </View>
//             <View style={styles.body}>
//                 <Tab.Navigator
//                     tabBarOptions={{
//                         activeTintColor: 'red',
//                         inactiveTintColor: '#b5b5b5',
//                         showIcon: false,
//                         labelStyle: {
//                             fontSize: 17,
//                         },
//                         style: {backgroundColor: '#f3f3f3',borderTopColor:'#b0b8b8',borderTopWidth:1},
//                         tabStyle: {
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             borderRightWidth:1,
//                             borderRightColor:'#f7f5f5'
//                         },
//                     }}>
//                     <Tab.Screen name="Feed" component={CxDevxFeed} />
//                     <Tab.Screen name="Learn" component={CxDevxLearn} />
//                     <Tab.Screen
//                         name="Search"
//                         component={CxDevxSearch}
//                         options={{
//                             tabBarIcon: ({color, size}) => (
//                                 <Icon
//                                     name="forward"
//                                     color="#333333"
//                                     size={40}
//                                 />
//                             ),
//                         }}
//                     />
//                     <Tab.Screen name="Topic" component={CxDevxTopic} />
//                 </Tab.Navigator>
//             </View>
//         </View>
//     );
// };
// export default CxDevxLogin;
