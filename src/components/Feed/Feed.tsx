import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';

import { styles } from './styles';
import CxDevxPost from '../PostCard/postCard';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL';
import { Post } from '../../models/post.model';

function CxDevxFeed({ navigation }: HomeStackNavProps<"Feed">) {

    const { logout } = useContext(AuthContext);
    const [postID, setPostID] = React.useState([]);
    const fetchPostData = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });

    React.useEffect(() => {
        if (fetchPostData.data) {
            setPostID(fetchPostData.data.getPosts);
        }
    }, [fetchPostData]);

    return (
        <ScrollView style={styles.content}>
            <TouchableOpacity onPress={() => logout()}>
                <Text style={{ fontSize: 20, alignSelf: 'center', marginVertical: 15 }} >Logout</Text>
            </TouchableOpacity>

            {
                postID.map((resPostID: Post) =>
                    <TouchableOpacity key={resPostID.id} onPress={() => navigation.navigate('PostDetail', { postID: resPostID.id })}>
                        <CxDevxPost postID={resPostID.id} />
                    </TouchableOpacity>
                )
            }
        </ScrollView>
    )
}



export default CxDevxFeed;
