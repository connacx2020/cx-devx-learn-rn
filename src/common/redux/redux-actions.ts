import {
    rdxUserInfo,
    rdxAuthUserInfo
} from './redux-types';
import { User } from '../../models';

export interface AuthUserInfo {
    email: string,
    userID: string,
    username: string,
    name: string,
    token: string
}

export const saveAuthUserInfo = (authUserInfo: AuthUserInfo) => {
    return {
        type: rdxAuthUserInfo,
        email: authUserInfo.email,
        userID: authUserInfo.userID,
        username: authUserInfo.username,
        name: authUserInfo.name,
        token: authUserInfo.token
    }
}

export const saveUserInfo = (userInfoData: User) => {
    return {
        type: rdxUserInfo,
        userInfoData
    }
}
