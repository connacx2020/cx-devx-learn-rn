import {
    rdxUserInfo,
    rdxAuthUserInfo,
    mentorStepInfo_save,
    mentorStepInfo_get
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

export const saveMentorStep = (ms_route_name:string)=>{
    return{
        type:mentorStepInfo_save,
        payload:ms_route_name
    }
}
export const getMentorStep =()=>{
    return {
        type:mentorStepInfo_get
    }
}