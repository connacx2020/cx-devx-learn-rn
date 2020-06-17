import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Button, ToastAndroid, Image, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { createCourseSchema, getAllPostSeriesSchema, getAllTopicsSchema, uploadCoursePicSchema } from '../../common/graphQL';
import { serverlessClient, graphqlClient, devXFileUploadClient } from '../../common/graphQL/graphql.config';
import { from } from 'rxjs';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Query } from '@apollo/react-components';
import MultiSelect from 'react-native-multiple-select';
import { ReactNativeFile } from 'apollo-upload-client';
import { Picker } from '@react-native-community/picker';

export const CxDevxCourseCreate = () => {

    const navigation = useNavigation();
    const [outcome, setOutCome] = React.useState<string[]>([]);
    const [requirements, setRequirements] = React.useState<string[]>([]);

    const [outcomeInput, setOutComeInput] = React.useState<string>('');
    const [requirementsInput, setRequirementsInput] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [seriesID, setSeriesID] = React.useState<any>();
    const [duration, setDuration] = React.useState<string>('');
    const [photo, setPhoto] = React.useState<any>();
    const [topicID, setTopicID] = React.useState<string[]>([]);
    const [uploadCoursePhoto] = useMutation(uploadCoursePicSchema, { client: devXFileUploadClient });
    // const auth: AuthUserInfo = useSelector((state: any) => state.authUserInfo);

    const [createCourse] = useMutation(createCourseSchema, { client: serverlessClient });

    const addOutCome = (value: string) => {
        value !== "" && setOutCome(outcome.concat(value));
        setOutComeInput('');
    }
    const addRequirements = (value: string) => {
        value !== "" && setRequirements(requirements.concat(value));
        setRequirementsInput('');
    }

    const filePick = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });

            const file = new ReactNativeFile({
                uri: res.uri,
                name: res.name,
                type: 'image/jpeg'
            });

            uploadCoursePhoto({ variables: { file } })
                .then(result => {
                    setPhoto(result.data.uploadCoursePhoto.uri)
                }, err => console.log(err))

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const createCoursePressed = () => {
        if (seriesID !== undefined && duration !== '' && description !== '' && outcome.length > 0 && requirements.length > 0) {
            from(createCourse({
                variables: {
                    authorID: '81e0964d-6da3-4e55-b894-e8a79be6cb02',
                    title,
                    photoUrl: photo ? photo.uri : '',
                    seriesID: seriesID.id,
                    duration,
                    description,
                    outcome,
                    requirements,
                    topicID
                }
            })).subscribe(res => {
                res.data.createNewCourse === true && navigation.navigate('Home')
                ToastAndroid.show("Course creation successful!", ToastAndroid.SHORT);
            }, err => {
                ToastAndroid.show("Course creation Error!", ToastAndroid.SHORT);
                console.log(err)
            }
            )
        } else {
            ToastAndroid.show("Please fill all field", ToastAndroid.SHORT);
        }
    }

    const removeFromList = (info: string, index: number) => {
        switch (info) {
            case "outcome":
                let outcomeResult = outcome.splice(index, 1);
                setOutCome(outcome.filter((item: any) => item !== outcomeResult));
                break;
            case "requirements":
                let reqResult = requirements.splice(index, 1);
                setRequirements(requirements.filter((item: any) => item !== reqResult));
                break;
        }

    }

    React.useEffect(() => {
    }, [photo]);

    return (
        <View>
            <View style={styles.body}>
                <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: 'center' }}>Create Course</Text>
                <TouchableOpacity
                    onPress={() => createCoursePressed()}
                    style={styles.create_btn}
                >
                    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                        <Icon
                            name="plus"
                            color="#fff"
                            size={20}
                        />
                        <Text style={{ color: '#fff' }}>Create</Text>
                    </View>


                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                <View>
                    <TouchableOpacity style={styles.imgSection} onPress={() => filePick()}>
                        {photo ?
                            <Image resizeMode="stretch" source={{ uri: photo }} style={{ alignSelf: 'center', width: "100%", height: "100%" }} /> :
                            <View style={{ display: 'flex', flexDirection: 'column' }}><Text style={styles.imgSectionText}>Add Course Photo</Text>
                                <Text style={styles.imgSectionText}>Recommended Size 1024x500 dimensions</Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Choose Series</Text>
                    <Query<any, any> query={getAllPostSeriesSchema} client={graphqlClient}>
                        {
                            (postSeries) => {
                                if (postSeries.loading) return <Text>Loading</Text>
                                if (postSeries.error) return <Text>Error</Text>

                                return <Picker
                                    selectedValue={seriesID}
                                    onValueChange={(itemValue: any, itemIndex) => { setSeriesID(itemValue); setTitle(itemValue.title) }}
                                >
                                    <Picker.Item label="Choose Series name" value="" />

                                    {
                                        postSeries.data.getAllSeries.map((res: any) => <Picker.Item key={res.id} label={res.title} value={res} />)
                                    }

                                </Picker>
                            }
                        }
                    </Query>
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Course Title</Text>
                    <TextInput value={title} onChangeText={text => setTitle(text)} placeholder="Enter Course Title" style={styles.text_Input} />
                </View>

                <Query<any, any> query={getAllTopicsSchema}>
                    {
                        (fetchTopic) => {

                            if (fetchTopic.error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                            if (fetchTopic.loading) return <View style={{ alignSelf: 'center' }} >
                                <Text>Loading</Text>
                            </View>

                            return <View style={styles.content_container}>
                                <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Choose Topics</Text>
                                <MultiSelect
                                    hideTags
                                    items={fetchTopic.data.findAllTopic}
                                    uniqueKey="id"
                                    // ref={multiSelectRef}
                                    onSelectedItemsChange={(selectedItems) => setTopicID(selectedItems)}
                                    selectedItems={topicID}
                                    selectText="Choose Topics"
                                    searchInputPlaceholderText="Search Items..."
                                    onChangeInput={(text) => console.log(text)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="red"
                                    selectedItemTextColor="red"
                                    selectedItemIconColor="red"
                                    itemTextColor="#000"
                                    displayKey="title"
                                    searchInputStyle={{ color: '#CCC' }}
                                    submitButtonColor="red"
                                    submitButtonText="Submit"
                                />
                            </View>

                        }
                    }
                </Query>


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
                    {outcome.length > 0 &&
                        <View style={{ backgroundColor: '#c5d1db', padding: 5, marginVertical: 5 }}>
                            {
                                outcome.map((res, index) => <View key={index} style={{ marginVertical: 3, padding: 7, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ flex: 9 }} >{index + 1}. {res}</Text>
                                    <TouchableOpacity onPress={() => removeFromList("outcome", index)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon
                                            name="delete"
                                            color="#000"
                                            size={25}
                                        /></TouchableOpacity>
                                </View>)
                            }
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput value={outcomeInput} onChangeText={text => setOutComeInput(text)} placeholder="Enter" style={[styles.text_Input, { flex: 2 }]} />
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Button title='Add' disabled={outcomeInput === ''} onPress={() => addOutCome(outcomeInput)} />
                        </View>
                    </View>
                </View>

                <View style={styles.content_container}>
                    <Text style={styles.content_header}>Requirements</Text>
                    {requirements.length > 0 &&
                        <View style={{ backgroundColor: '#c5d1db', padding: 5, marginVertical: 5 }}>
                            {
                                requirements.map((res, index) => <View key={index} style={{ marginVertical: 3, padding: 7, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ flex: 9 }} >{index + 1}. {res}</Text>
                                    <TouchableOpacity onPress={() => removeFromList("requirements", index)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon
                                            name="delete"
                                            color="#000"
                                            size={25}
                                        /></TouchableOpacity>
                                </View>)
                            }
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput value={requirementsInput} onChangeText={text => setRequirementsInput(text)} placeholder="Enter" style={[styles.text_Input, { flex: 2 }]} />
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Button disabled={requirementsInput === ''} title='Add' onPress={() => addRequirements(requirementsInput)} />
                        </View>
                    </View>
                </View>

                <View>
                    <Button title='Discard' onPress={() => navigation.navigate('Home')} />
                </View>
            </ScrollView>
        </View>
    )
}

export const styles = StyleSheet.create({
    body: {
        display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, height: 50, elevation: 3
    },
    container: {
        paddingHorizontal: 10,
        height: "92%",

    },
    modalBoxContent: {
        margin: 20,
        width: '90%',
        backgroundColor: "white",
        shadowColor: "#000",
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1
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
    },
    create_btn: {
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#24a2f0',
        padding: 6,
        borderRadius: 10
    }
});
