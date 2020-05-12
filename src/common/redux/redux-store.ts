import { createStore, combineReducers } from 'redux';
import { UserInfoReducer } from './redux-reducers';

const reducers = combineReducers({
    userInfo: UserInfoReducer
});

const store = createStore(reducers);

export default store;
