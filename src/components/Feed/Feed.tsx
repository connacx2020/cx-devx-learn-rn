import React, { useContext } from 'react';
import { ScrollView ,TouchableOpacity,Text} from 'react-native';
import {HomeStackNavProps} from '../../ultis/ParamLists/HomeParamList'

import { styles } from './styles';
import CxDevxPost from '../PostCard/Card';
import { AuthContext } from '../../Providers/AuthProvider';

function CxDevxFeed({ navigation }: HomeStackNavProps<"Feed">) {
    const {logout} = useContext(AuthContext);
    return (
        <ScrollView style={styles.content}>
            <TouchableOpacity onPress={()=>logout()}>
                <Text style={{fontSize:20, alignSelf:'center', marginVertical:15,color:'red'}} >Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
                <CxDevxPost/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
                <CxDevxPost/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
                <CxDevxPost/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
                <CxDevxPost/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
                <CxDevxPost/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
                <CxDevxPost/>
            </TouchableOpacity>


        </ScrollView>
    )
}



export default CxDevxFeed;
