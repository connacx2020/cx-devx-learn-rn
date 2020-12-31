import React from 'react';
import { useEffect } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { styles } from './style';
import CxPostDetail from '../../PostDetail/PostDetail';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LearnStackNavProps } from '../../../common/ultis/ParamLists/LearnParamList';

function CxDevxCourseSection({ navigation, route }: LearnStackNavProps<"CourseSection">) {

    const tabNavigation = useNavigation();
    const parent = tabNavigation.dangerouslyGetParent();
    const { postID, postSeries } = route.params;
    const [renderPostID, setPostID] = React.useState(postID);
    const [headTitle, setHeadTitle] = React.useState(route.params.course)

    useEffect(() => {
        parent?.setOptions({ tabBarVisible: false })
    });

    useEffect(() => {
        navigation.setOptions({ title: headTitle });
    }, [headTitle])


    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (

        <GestureRecognizer
            // onSwipeUp={() => console.log("SwipeUp")}
            // onSwipeDown={() => console.log("SwipeDown")}
            onSwipeRight={() => {
                let currentPostId = postSeries.filter((item: any) => item.id === renderPostID);
                if (postSeries.indexOf(currentPostId[0]) === 0) {
                    ToastAndroid.showWithGravity(
                        "This is First Post",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                } else {
                    if (postSeries.length >= 1) {
                        setPostID(postSeries[postSeries.indexOf(currentPostId[0]) - 1].id);
                        setHeadTitle(postSeries[postSeries.indexOf(currentPostId[0]) - 1].title);
                    }
                }
            }}
            onSwipeLeft={() => {
                let currentPostId = postSeries.filter((item: any) => item.id === renderPostID);
                if (postSeries.length >= 1) {
                    if (postSeries.indexOf(currentPostId[0]) === postSeries.length - 1) {
                        ToastAndroid.showWithGravity(
                            "This is Last Post",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                    } else {
                        setPostID(postSeries[postSeries.indexOf(currentPostId[0]) + 1].id);
                        setHeadTitle(postSeries[postSeries.indexOf(currentPostId[0]) + 1].title);
                    }
                }
            }}
            config={config}
            style={styles.wrapper}
        >
            <CxPostDetail postID={renderPostID} />
        </GestureRecognizer >

    )
}


export default CxDevxCourseSection;
