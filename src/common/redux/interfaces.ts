import { User } from '../../models';

export interface AuthInfoAction {
    type: string;
    email: string;
    userID: string;
    username: string;
    name: string;
    token: string;
    isConfirmed: boolean;
}

export interface UserInfoAction {
    type: string;
    userInfoData: User;
}


export interface ReduxUsers {
    userInfoData: User[];
}
