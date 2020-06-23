import { createStore, combineReducers } from 'redux';
import { UserInfoReducer, AuthReducer,MentorStepReducer } from './redux-reducers';

const reducers = combineReducers({
    userInfo: UserInfoReducer,
    authUserInfo: AuthReducer,
    mentorStepInfo:MentorStepReducer
});

const store = createStore(reducers);

export default store;
