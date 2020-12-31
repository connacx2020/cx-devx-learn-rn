
import { User } from '../../models';
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
    store.dispatch(saveUserInfo(resultApi.data.getUserInfoByID));
    return resultApi.data.getUserInfoByID;
}


