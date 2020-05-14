import { rdxUserInfo } from './redux-types';
import { User } from '../../models';

const initialUserInfoState: any = {
    userInfoData: []
}

export const UserInfoReducer = (state: any = initialUserInfoState, userInfoAction: any): User | any => {
    switch (userInfoAction.type) {
        case rdxUserInfo:
            if(state.userInfoData.includes(userInfoAction.userInfoData)){
                // console.log('already exist')
                return state
            }else{
                return {
                    ...state,
                    userInfoData: [...state.userInfoData, userInfoAction.userInfoData]
                }
            }

        default:
            return state
    }
}

