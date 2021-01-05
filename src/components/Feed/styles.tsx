import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
        marginVertical: 3,
        marginHorizontal: 5,
        paddingVertical: 5
    },
    query_info: {
        flex: 1,
        marginTop: Math.round(Dimensions.get("window").height) / 2.5,
        alignItems: 'center'
    },
    postCard: {
        elevation: 5,
        borderRadius: 8,
        marginBottom: 10,
        shadowOpacity: 0.25,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    info_txt: {
        fontSize: 17,
    },
    info_time: {
        fontSize: 13,
    },
    content: {
        flexDirection: 'column',
        margin: 5,
        padding: 5,
        paddingVertical: 10,
    },
    content_title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    content_title_txt: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 10
    },
    content_txt: {
        padding: 5,
        fontSize: 15
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5
    },
});
