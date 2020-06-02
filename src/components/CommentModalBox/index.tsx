import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { styles } from './style';

type CommentModalProps = {
    isLiked: Boolean;
    isModalVisible: Boolean;
    setLike: () => void;
    setModalVisible: () => void;
};
export const CxDevxCommentModal: React.FC<CommentModalProps> = ({
    isLiked,
    isModalVisible,
    setLike,
    setModalVisible,
}) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    return (
        <Modal
            deviceWidth={screenWidth}
            deviceHeight={screenHeight}
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible(false)}>
            <View style={styles.modal}>
                <View style={styles.modal_header}>
                    <TouchableOpacity
                        style={styles.modal_header_back_left}
                        onPress={() => setModalVisible(!isModalVisible)}>
                        <FeatherIcon
                            name={'arrow-left'}
                            size={25}
                            color={'#7C7879'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLike(!isLiked)}
                        style={styles.modal_header_likes_right}>
                        {!isLiked ? (
                            <AntdIcon
                                name={'like2'}
                                size={25}
                                color={'#6D696A'}
                            />
                        ) : (
                            <AntdIcon
                                name={'like1'}
                                size={25}
                                color={'#1E91D6'}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.modal_content}>
                    <View style={styles.modal_comment_container}>
                        <View style={styles.modal_comment_hader}>
                            <View
                                style={
                                    styles.modal_comment_header_avatar_lfield
                                }>
                                <Image
                                    style={styles.modal_avatar}
                                    source={{
                                        uri:
                                            'https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/89774706_2606846246304197_7773716000591052800_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=ia5SLkxBUTcAX_fahzl&_nc_ht=scontent.fmdl4-2.fna&oh=59b20f75a5a7dcd9e9e0b696d94ed53e&oe=5EF36708',
                                    }}
                                />
                            </View>
                            <View
                                style={
                                    styles.modal_comment_header_userInfo_rfield
                                }>
                                <Text style={styles.modal_user_info_txt}>
                                    Min Khant T Kyi
                                </Text>
                                <Text style={styles.modal_comment_time_txt}>
                                    4 hours ago
                                </Text>
                            </View>
                        </View>
                        <View style={styles.modal_comment_content}>
                            <Text style={styles.modal_comment_content_txt}>
                                What is Angular?
                            </Text>
                        </View>
                    </View>
                    <View style={styles.modal_comment_container}>
                        <View style={styles.modal_comment_hader}>
                            <View
                                style={
                                    styles.modal_comment_header_avatar_lfield
                                }>
                                <Image
                                    style={styles.modal_avatar}
                                    source={{
                                        uri:
                                            'https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/95386715_886712598416422_7232492551553417216_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=JbiaCL_AYZ8AX_f3uxj&_nc_ht=scontent.fmdl4-2.fna&oh=2d5a2e244f3e30e7abc5372bb29a8ee9&oe=5EF3AAB9',
                                    }}
                                />
                            </View>
                            <View
                                style={
                                    styles.modal_comment_header_userInfo_rfield
                                }>
                                <Text style={styles.modal_user_info_txt}>
                                    Vertix Horizon
                                </Text>
                                <Text style={styles.modal_comment_time_txt}>
                                    1 hours ago
                                </Text>
                            </View>
                        </View>
                        <View style={styles.modal_comment_content}>
                            <Text style={styles.modal_comment_content_txt}>
                                Good Course! It is very helpful! Thank You so
                                must!
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.modal_footer}>
                    <TextInput
                        style={styles.modal_comment_txtinput}
                        placeholder="Write a comment ..."
                    />
                </View>
            </View>
        </Modal>
    );
};
