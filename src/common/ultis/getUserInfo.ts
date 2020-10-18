
import { ToastAndroid } from 'react-native';
import { User } from 'src/models';
import { getUserByIDHandler } from '../graphQL';
import { saveUserInfo, store } from '../redux';
import { checkUserInfoInRedux } from './checkUserInfoInRedux';

export async function getCheckedUserInfo(userID: string): Promise<User> {
    const reduxUsers: { userInfoData: User[] } = store.getState().userInfo;
    const result: User | null = checkUserInfoInRedux(reduxUsers.userInfoData, userID);

    if (result !== null) {
        return result;
    }

    const resultApi: { data: { getUserInfoByID: User } } = await getUserByIDHandler(userID);
    ToastAndroid.show(`user data from ${userID}`, 2000)
    store.dispatch(saveUserInfo(resultApi.data.getUserInfoByID));
    return resultApi.data.getUserInfoByID;
}


