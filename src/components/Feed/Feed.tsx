import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';

import { styles } from './styles';
import CxDevxPost from '../PostCard/postCard';
import { useQuery } from '@apollo/react-hooks';
import { getAllPostsSchema } from '../../common/graphQL';
import { Post } from '../../models/post.model';


import { CxDevxCourseItem } from '../CourseItem';


function CxDevxFeed({ navigation }: HomeStackNavProps<"Feed">) {


    const [postID, setPostID] = React.useState([]);
    const fetchPostData = useQuery(getAllPostsSchema, { notifyOnNetworkStatusChange: true });

    // React.useEffect(() => {
    //     if (fetchPostData.data) {
    //         setPostID(fetchPostData.data.getPosts);
    //     }
    // }, [fetchPostData]);

    return (
        <ScrollView style={styles.content}>
            {/* {
                postID.map((resPostID: Post) =>
                    <TouchableOpacity key={resPostID.id} onPress={() => navigation.navigate('PostDetail', { postID: resPostID.id })}>
                        <CxDevxPost postID={resPostID.id} />
                    </TouchableOpacity>
                )
            } */}

            <Text style={styles.centerTxt}>Recommended for you</Text>

            <CxDevxCourseItem
                img="https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg"
                title="GraphQL Advanced Course"
                rate={4.5}
                likes={1000}
            />
            <CxDevxCourseItem
                img="https://miro.medium.com/max/2880/1*xcDT-neKHP7E3quS9n30gw.png"
                title="React Hooks Course"
                rate={5}
                likes={1050}
            />

            <CxDevxCourseItem
                img="https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png"
                title="Nodejs Advanced Course"
                rate={5}
                likes={890}
            />
            <CxDevxCourseItem
                img="https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg"
                title="React Native With Typescript"
                rate={4.5}
                likes={1000}
            />
            <CxDevxCourseItem
                img="https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png"
                title="GraphQL with Neo4j  Course"
                rate={3.5}
                likes={1000}
            />

            <Text style={styles.centerTxt}>Related Topics</Text>

            <CxDevxCourseItem
                img="https://miro.medium.com/max/1400/1*uvd7Z4npUG8qulaQLjHcZw.jpeg"
                title="GraphQL Advanced Course"
                rate={4.5}
                likes={1000}
            />
            <CxDevxCourseItem
                img="https://miro.medium.com/max/2880/1*xcDT-neKHP7E3quS9n30gw.png"
                title="React Hooks Course"
                rate={5}
                likes={1050}
            />

            <CxDevxCourseItem
                img="https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png"
                title="Nodejs Advanced Course"
                rate={5}
                likes={890}
            />
            <CxDevxCourseItem
                img="https://i.ytimg.com/vi/OdU9H-_d14Y/maxresdefault.jpg"
                title="React Native With Typescript"
                rate={4.5}
                likes={1000}
            />
            <CxDevxCourseItem
                img="https://dist.neo4j.com/wp-content/uploads/20170524234854/graph-ql-graph-database-neo4j-integration.png"
                title="GraphQL with Neo4j  Course"
                rate={3.5}
                likes={1000}
            />
        </ScrollView>
    )
}



export default CxDevxFeed;
