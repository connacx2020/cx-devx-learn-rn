import React from 'react';
import { useEffect } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { styles } from './style';
import { HomeStackNavProps } from '../../common/ultis/ParamLists/HomeParamList';
import CxPostDetail from '../PostDetail/PostDetail';
import { ToastAndroid, View } from 'react-native';

function CxDevxCourseSection({ navigation, route }: HomeStackNavProps<"CourseSection">) {

    const { postID, postSeries } = route.params;
    const [renderPostID, setPostID] = React.useState(postID);
    const [headTitle, setHeadTitle] = React.useState(route.params.course)


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
                    setPostID(postSeries[postSeries.indexOf(currentPostId[0]) - 1].id);
                    setHeadTitle(postSeries[postSeries.indexOf(currentPostId[0]) - 1].title);
                }
            }}
            onSwipeLeft={() => {
                let currentPostId = postSeries.filter((item: any) => item.id === renderPostID);
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
            }}
            config={config}
            style={styles.wrapper}
        >
            <CxPostDetail postID={renderPostID} />
        </GestureRecognizer >

    )
}


export default CxDevxCourseSection;
