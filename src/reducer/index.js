import {combineReducers} from 'redux';
import homeReducer from './home'
const baseState = {

}
const baseReducer = (state = baseState, action) => {
    return {
        ...state,
        title: action.title || '1221'
    }
};
const index = combineReducers({
    baseReducer,
    homeReducer
});
export default index;