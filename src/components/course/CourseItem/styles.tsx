import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        width: 320,
        elevation: 5,
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 1
    },
    content: {
    },
    content_bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    img_blank: {
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2289f0'
    },
    img_blank_text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },
    img: {
        shadowOffset: { width: 2, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderColor: '#ededed',
        borderWidth: 0.5,
        height: 150,
        width: '100%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 18,
        fontStyle: 'italic',
        paddingLeft: 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        flexShrink: 1,
        marginRight: 10
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 5,
        paddingLeft: 5,
        justifyContent: 'space-between'
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    price_text: {
        paddingHorizontal: 10,
        alignSelf: 'center',
        fontSize: 15, fontWeight: 'bold'
    },
    star: {
        color: "#FFD700",
    },
    likes: {
        flexGrow: 1,
        marginTop: -3,
        marginHorizontal: 10,
        fontSize: 15,
        textAlign: 'right',
    }
});
