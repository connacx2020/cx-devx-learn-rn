import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 200,
        position: 'relative',
        flexDirection: 'row',
        elevation: 3,
        padding: 10
    },
    header_left: {
        flexGrow: 2,
    },
    back_arrow: {
        top: '5%',
        left: '1%',
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    avator_container: {
        left: '20%',
        top: '20%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    header_right: {
        flexGrow: 5,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    user_name: {
        fontSize: 23,
        fontWeight: '200',
        color: '#fff'
    },
    user_email: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#fff'
    },
    connect_follow_field: {
        flexDirection: 'row',
        marginTop: 20,
    },
    connect_follow_btn: {
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#2289f0'
    },
    connect_follow_txt: {
        fontWeight: '300',
    },
    social_field: {
        flexDirection: 'row',
    },
    icon_field: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    icon: {
        width: 25,
        height: 25
    },
    gmail_icon: {
        marginTop: -2.5,
        width: 25,
        height: 30
    },
    about_field: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        elevation: 2,
        borderRadius: 1
    },
    about_txt: {
        fontWeight: '300',
        fontSize: 18,
    },
    about_context_txt: {
        fontSize: 15,
    },
    profile_content: {
        flex: 1,
        marginHorizontal: 10
    }
});
