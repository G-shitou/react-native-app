import {combineReducers} from 'redux';
import homeReducer from './home';
import themeReducer from './theme';
import squareReducer from './square'
import type from '../action/type';
const baseState = {
    userinfo:'',
    score:'',   // {"coinCount": 10, "level": 1, "rank": 14442, "userId": 48213, "username": "石**了"}
}
const baseReducer = (state = baseState, action) => {
    switch (action.type) {
        // 刷新用户信息
        case type.USERINFO:
            return {
                ...state,
                userinfo:action.userinfo
            };
            break;
        // 刷新score
        case type.SCORE:
            return {
                ...state,
                score:action.score
            };
            break;
        default:         
            return {
                ...state,
            }
    }
};
const index = combineReducers({
    baseReducer,
    homeReducer,
    squareReducer,
    themeReducer,
});
export default index;