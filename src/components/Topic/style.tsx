import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 5
    },
    topic_card: {
        margin:5,
        flex: 1,
        flexDirection: 'column',
        elevation: 5,
        borderRadius: 3
    },
    topic_card_header: {
        height: 100,
        flexGrow: 3,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode:'cover',
    },
    heard_icon: {
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#7C7879',
        paddingHorizontal: 8,
        paddingVertical: 5
    },
    topic_card_footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topic_card_title_txt: {
        fontSize: 15,
        padding: 2,
        fontWeight: 'bold'
    },
    topic_card_desc_txt: {
        fontStyle: 'italic',
        fontSize: 12,
        padding: 2,
        textAlign: 'center'
    }
})
