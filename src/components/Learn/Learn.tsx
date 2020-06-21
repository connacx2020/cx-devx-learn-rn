import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LearnStackNavProps } from '../../common/ultis/ParamLists/LearnParamList';
import { useTheme } from '@react-navigation/native';
import { Query } from '@apollo/react-components';
import { getAllPostsSchema } from '../../common/graphQL';
function CxDevxLearn({ navigation }: LearnStackNavProps<"Learn">) {
    const { colors } = useTheme();

    const RenderRandomPosts = ({ index, post }) => {
        return (
            <View style={[styles.body, { backgroundColor: colors.background }]}>
                <Text style={[styles.text, { color: colors.text }]}>
                    Learn Screen
                    content:
                    {
                        post.content
                    }
                </Text>
            </View>
        )
    }

    return (
        <View>
            <Query<any, any> query={getAllPostsSchema} >
                {
                    ({ loading, error, data }) => {
                        console.log(data.getPosts)
                        if (loading) return <Text>Loading...</Text>
                        if (error) return <Text>Error</Text>
                        console.log("Get All post:", data.getPosts);
                        const allPosts = data.getPosts;
                        allPosts.sort(() => Math.random() - 0.5);
                        return allPosts.map((post: any, index: any) => <RenderRandomPosts key={index} post={post} index={index} />)
                    }
                }
            </Query>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }

});

export default CxDevxLearn;
