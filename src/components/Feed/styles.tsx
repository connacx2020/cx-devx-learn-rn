import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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
});