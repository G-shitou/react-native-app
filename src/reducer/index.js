import {combineReducers} from 'redux';
import homeReducer from './home';
import themeReducer from './theme';
const baseState = {

}
const baseReducer = (state = baseState, action) => {
    return {
        ...state,
        title: action.title || '1221'
    }
};
const index = combineReducers({
    homeReducer,
    themeReducer
});
export default index;