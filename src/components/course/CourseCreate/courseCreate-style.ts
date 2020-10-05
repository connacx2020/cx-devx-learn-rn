import { StyleSheet } from "react-native";

export const courseCreateStyles = StyleSheet.create({
    body: {
        display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, height: 50, elevation: 3
    },
    container: {
        marginVertical: 10,
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
        height: 180,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#000'
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
    },
    outcome_req_list: {
        marginVertical: 1,
        padding: 7,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#c5d1db'
    }
});
