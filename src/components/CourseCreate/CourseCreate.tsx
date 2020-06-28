import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Button, ToastAndroid, Image, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { createCourseSchema, getAllPostSeriesSchema, getAllTopicsSchema, uploadCoursePicSchema } from '../../common/graphQL';
import { serverlessClient, graphqlClient, devXFileUploadClient } from '../../common/graphQL/graphql.config';
import { from } from 'rxjs';
import { useNavigation, useTheme } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Query } from '@apollo/react-components';
import MultiSelect from 'react-native-multiple-select';
import { ReactNativeFile } from 'apollo-upload-client';
import { Picker } from '@react-native-community/picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import FeatherIcon from 'react-native-vector-icons/AntDesign';
import { courseCreateStyles } from './courseCreate-style';



export const CxDevxCourseCreate = () => {

    const navigation = useNavigation();
    const { colors } = useTheme();
    const [outcome, setOutCome] = React.useState<string[]>([]);
    const [requirements, setRequirements] = React.useState<string[]>([]);

    const [outcomeInput, setOutComeInput] = React.useState<string>('');
    const [requirementsInput, setRequirementsInput] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [seriesID, setSeriesID] = React.useState<any>();
    const [duration, setDuration] = React.useState<string>('');
    const [coursePrice, setCoursePrice] = React.useState<string>('');
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
        if (seriesID !== undefined && duration !== '' && description !== '' && outcome.length > 0) {
            from(createCourse({
                variables: {
                    authorID: '81e0964d-6da3-4e55-b894-e8a79be6cb02',
                    title,
                    photoUrl: photo ? photo : '',
                    seriesID: seriesID.id,
                    price: coursePrice === '' ? parseFloat("0") : parseFloat(coursePrice),
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
        <View style={{ flex: 1 }}>
            <View style={[{ height: 56, flexDirection: 'row', elevation: 1 }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 72, justifyContent: 'center', alignItems: 'center', marginLeft: -10 }}
                >
                    <FeatherIcon name={"arrowleft"} size={30} color={colors.text} />
                </TouchableOpacity>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={[{ fontSize: 23, color: colors.text }]}>
                        Create Course
                    </Text>
                </View>
            </View>

            <ProgressSteps
                activeStepIconBorderColor="#2e85ff"
                activeLabelColor="#2e85ff"
                activeStepNumColor="#004fbd"
                completedCheckColor="white"
                completedStepIconColor="#2e85ff"
                completedStepNumColor="#000"
                completedProgressBarColor="#2e85ff"
                disabledStepNumColor="blue"
                marginBottom={40}
            >
                <ProgressStep label="First Step">
                    <View style={courseCreateStyles.container}>
                        <View>
                            <TouchableOpacity style={[courseCreateStyles.imgSection]} onPress={() => filePick()}>
                                {photo ?
                                    <Image resizeMode="stretch" source={{ uri: photo }} style={{ alignSelf: 'center', width: "100%", height: "100%" }} /> :
                                    <View style={{ display: 'flex', flexDirection: 'column' }}><Text style={courseCreateStyles.imgSectionText}>Add Course Photo</Text>
                                        <Text style={courseCreateStyles.imgSectionText}>Recommended Size 1024x500 dimensions</Text>
                                    </View>
                                }
                                {
                                    photo && <TouchableOpacity onPress={() => setPhoto(undefined)} style={{ elevation: 5, alignSelf: 'flex-end', position: 'absolute', top: 10, right: 10 }}>
                                        <Icon
                                            name="cancel"
                                            color="#fff"
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Choose Series</Text>
                            <Query<any, any> query={getAllPostSeriesSchema} client={graphqlClient}>
                                {
                                    (postSeries) => {
                                        if (postSeries.loading) return <Text style={{ color: colors.text }}>Loading</Text>
                                        if (postSeries.error) return <Text style={{ color: colors.text }}>Error</Text>

                                        return <Picker
                                            style={{ color: colors.text }}
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

                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Course Title</Text>
                            <TextInput value={title} onChangeText={text => setTitle(text)} style={[courseCreateStyles.text_Input, { color: colors.text }]} placeholderTextColor={colors.text} />
                        </View>


                    </View>
                </ProgressStep>
                <ProgressStep label="Second Step">
                    <View style={courseCreateStyles.container}>
                        <Query<any, any> query={getAllTopicsSchema}>
                            {
                                (fetchTopic) => {

                                    if (fetchTopic.error) ToastAndroid.show("No Internet Connection ", ToastAndroid.SHORT);

                                    if (fetchTopic.loading) return <View style={{ alignSelf: 'center' }} >
                                        <Text style={{ color: colors.text }}>Loading</Text>
                                    </View>

                                    if (fetchTopic.data) {
                                        return <View style={courseCreateStyles.content_container}>
                                            <Text style={[{ marginBottom: 5, fontWeight: "bold" }, { color: colors.text }]}>Choose Topics</Text>
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
                                    } else {
                                        return <Text>No Connection!</Text>
                                    }

                                }
                            }
                        </Query>

                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Course Description</Text>
                            <TextInput value={description} onChangeText={text => setDescription(text)} numberOfLines={5} multiline={true} style={{ textAlignVertical: "top", marginVertical: 5, borderBottomWidth: 1, borderColor: '#333', color: colors.text }} placeholderTextColor={colors.text} />
                        </View>

                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Duration</Text>
                            <TextInput value={duration} onChangeText={(text) => setDuration(text)} style={[courseCreateStyles.text_Input, { color: colors.text }]} placeholderTextColor={colors.text} />
                        </View>

                    </View>
                </ProgressStep>
                <ProgressStep label="Final Step"
                    onSubmit={() => createCoursePressed()}
                >
                    <ScrollView style={courseCreateStyles.container}>
                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Outcome</Text>
                            {outcome.length > 0 &&
                                <View style={{ padding: 5, marginVertical: 5 }}>
                                    {
                                        outcome.map((res, index) => <View key={index} style={courseCreateStyles.outcome_req_list}>
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
                                <TextInput value={outcomeInput} onChangeText={text => setOutComeInput(text)} style={[courseCreateStyles.text_Input, { color: colors.text, flex: 2 }]} placeholderTextColor={colors.text} />
                                <View style={{ flex: 1, paddingLeft: 10 }}>
                                    <Button title='Add' disabled={outcomeInput === ''} onPress={() => addOutCome(outcomeInput)} />
                                </View>
                            </View>
                        </View>

                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Requirements</Text>
                            {requirements.length > 0 &&
                                <View style={{ padding: 5, marginVertical: 5 }}>
                                    {
                                        requirements.map((res, index) => <View key={index} style={courseCreateStyles.outcome_req_list}>
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
                                <TextInput value={requirementsInput} onChangeText={text => setRequirementsInput(text)} style={[courseCreateStyles.text_Input, { flex: 2, color: colors.text }]} placeholderTextColor={colors.text} />
                                <View style={{ flex: 1, paddingLeft: 10 }}>
                                    <Button disabled={requirementsInput === ''} title='Add' onPress={() => addRequirements(requirementsInput)} />
                                </View>
                            </View>
                        </View>

                        <View style={courseCreateStyles.content_container}>
                            <Text style={[courseCreateStyles.content_header, { color: colors.text }]}>Course Price in $</Text>
                            <TextInput value={coursePrice} onChangeText={(text) => setCoursePrice(text)} style={[courseCreateStyles.text_Input, { color: colors.text }]} placeholderTextColor={colors.text} />
                        </View>

                    </ScrollView>
                </ProgressStep>
            </ProgressSteps>
        </View>
    )
}
