import { createStore, combineReducers } from 'redux';
import { UserInfoReducer, AuthReducer } from './redux-reducers';

const reducers = combineReducers({
    userInfo: UserInfoReducer,
    authUserInfo: AuthReducer,
});

const store = createStore(reducers);

export default store;
