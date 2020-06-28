import { rdxUserInfo, rdxAuthUserInfo,mentorStepInfo_save,mentorStepInfo_get } from './redux-types';
import { User, Auth } from '../../models';
import { AuthUserInfo } from './redux-actions';

const initialUserInfoState: any = {
    userInfoData: []
}

const initialAuthState: AuthUserInfo = {
    email: '',
    userID: '',
    name: '',
    username: '',
    token: '',
}

const initialMentorStep:any = {
    ms_route_name : ''
}

export const AuthReducer = (state: AuthUserInfo = initialAuthState, action: any): Auth | any => {
    switch (action.type) {
        case rdxAuthUserInfo:
            if (action.token !== null) {
                return {
                    ...state,
                    email: action.email,
                    userID: action.userID,
                    name: action.name,
                    username: action.username,
                    token: action.token,
                    isLogined: action.isLogined
                }
            } else {
                return state;
            }
        default:
            return state;
    }
}

export const UserInfoReducer = (state: any = initialUserInfoState, userInfoAction: any): User | any => {
    switch (userInfoAction.type) {
        case rdxUserInfo:
            if (state.userInfoData.includes(userInfoAction.userInfoData)) {
                // console.log('already exist')
                return state
            } else {
                return {
                    ...state,
                    userInfoData: [...state.userInfoData, userInfoAction.userInfoData]
                }
            }

        default:
            return state
    }
}

export const MentorStepReducer = (state : any = initialMentorStep, action:any) : any =>{
    switch (action.type) {
        case mentorStepInfo_save:
            return{
                ...state,
                ms_route_name:action.payload
            }
        case mentorStepInfo_get:
            return state
            
        default:
            return state;
    }
}
