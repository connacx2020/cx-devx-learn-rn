import {
    rdxUserInfo
} from './redux-types';
import { User } from '../../models';

export const saveUserInfo = (userInfoData: User) => {
    return {
        type: rdxUserInfo,
        userInfoData
    }
}
