import { ID } from './types';

export interface Auth {
    email: string;
    userID: ID;
    name: string;
    username: string;
    token: string;
    isLoggedIn: boolean;
}
