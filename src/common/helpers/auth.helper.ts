import { Auth } from '../../models';

export function initAuth(): Auth {
    return {
        email: '',
        userID: '',
        name: '',
        username: '',
        token: '',
        isLoggedIn: false
    }
}
