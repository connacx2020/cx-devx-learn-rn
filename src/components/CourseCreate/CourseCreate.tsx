import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Button, ToastAndroid, Image } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { createCourseSchema } from '../../common/graphQL';
import { serverlessClient } from '../../common/graphQL/graphql.config';
import { from } from 'rxjs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CxDevxCourseCreate = () => {

    const navigation = useNavigation();
    const [outcome, setOutCome] = React.useState<string[]>([]);
    const [requirements, setRequirements] = React.useState<string[]>([]);

    const [outcomeInput, setOutComeInput] = React.useState<string>('');
    const [requirementsInput, setRequirementsInput] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [seriesId, setSeriesId] = React.useState<string>('');
    const [duration, setDuration] = React.useState<string>('');
    const [authorID, setAuthorID] = React.useState();
    const [photo, setPhoto] = React.useState<any>();

    const [createCourse] = useMutation(createCourseSchema, { client: serverlessClient });

    const addOutCome = (value: string) => {
        value !== "" && setOutCome(outcome.concat(value));
    }
    const addRequirements = (value: string) => {
        value !== "" && setRequirements(requirements.concat(value));
    }



    const filePick = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });

            setPhoto(res)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const createCoursePressed = () => {
        from(createCourse({
            variables: {
                authorID,
                title,
                photoUrl: photo ? photo.uri : '',
                seriesId: seriesId,
                duration,
                description,
                outcome,
                requirements
            }
        })).subscribe(res => {
            res.data.createNewCourse === true && navigation.navigate('Home')
            ToastAndroid.showWithGravity(
                "Course creation successful!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }, err => {
            ToastAndroid.showWithGravity(
                "Error",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        )
    }

    React.useEffect(() => {
        AsyncStorage.getItem("devx_token")
            .then(async (localToken: any) => {
                const localData = JSON.parse(localToken);
                if (localToken) {
                    setAuthorID(localData.userID)
                } else {
                    ToastAndroid.showWithGravity(
                        "No local data",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                }
            })
            .catch(err => {
                console.log(err);
            });

        return () => {
            // setPhoto(undefined)
        }
    }, [authorID, photo]);

    return (
        <View>

            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, height: 50, elevation: 3, }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: 'center' }}>Create Course</Text>
                <TouchableOpacity
                    disabled={outcomeInput === '' && requirementsInput === ''}
                    onPress={() => createCoursePressed()}
                    style={{ alignSelf: 'center', flexDirection: 'row', backgroundColor: 'blue', padding: 10, borderRadius: 10 }}
                >
                    {seriesId !== '' && duration !== '' && description !== '' && outcome.length > 0 && requirements.length > 0 && <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                        <Icon
                            name="plus"
                            color="#fff"
                            size={20}
                        />
                        <Text style={{ color: '#fff' }}>Create</Text>
                    </View>
                    }

                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                <View>
                    <TouchableOpacity style={styles.imgSection} onPress={() => filePick()}>
                        {photo ?
                            <Image resizeMode="stretch" source={{ uri: photo.uri }} style={{ alignSelf: 'center', width: "100%", height: "100%" }} /> :
                            <Text style={styles.imgSectionText}>Add Course Photo</Text>}
                    </TouchableOpacity>
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Series</Text>
                    <TextInput onChangeText={text => setSeriesId(text)} placeholder="Enter Course Series" style={styles.text_Input} />
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Course Title</Text>
                    <TextInput onChangeText={text => setTitle(text)} placeholder="Enter Course Title" style={styles.text_Input} />
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Course Description</Text>
                    <TextInput onChangeText={text => setDescription(text)} placeholder="Enter Course Description" numberOfLines={4} multiline={true} style={styles.text_Input} />
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Duration</Text>
                    <TextInput onChangeText={(text) => setDuration(text)} placeholder="Enter Course duration" style={styles.text_Input} />
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Outcome</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={text => setOutComeInput(text)} placeholder="Enter" style={[styles.text_Input, { flex: 2 }]} />
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Button title='Add' disabled={outcomeInput === ''} onPress={() => addOutCome(outcomeInput)} />
                        </View>
                    </View>
                    {outcome.length > 0 &&
                        <View style={{ backgroundColor: 'gray', padding: 10 }}>
                            {
                                outcome.map(res => <Text key={res}>{res}</Text>)
                            }
                        </View>
                    }

                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Requirements</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={text => setRequirementsInput(text)} placeholder="Enter" style={[styles.text_Input, { flex: 2 }]} />
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Button disabled={requirementsInput === ''} title='Add' onPress={() => addRequirements(requirementsInput)} />
                        </View>
                    </View>
                    {requirements.length > 0 &&
                        <View style={{ backgroundColor: 'gray', padding: 10 }}>
                            {
                                requirements.map(res => <Text key={res} >{res}</Text>)
                            }
                        </View>
                    }
                </View>

                <View>
                    <Button title='Discard' onPress={() => navigation.navigate('Home')} />
                </View>
            </ScrollView>
        </View>
    )
}

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        height: "92%",

    },
    imgSection: {
        flex: 1,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#333'
    },
    imgSectionText: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    content_container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        elevation: 2,
        shadowColor: '#333',
        marginVertical: 5,
        borderRadius: 1,
        shadowOpacity: 0.5,
    },
    content_header: {
        fontWeight: "bold"
    },
    text_Input: {
        borderColor: '#000',
        borderBottomWidth: 1
    }

});
