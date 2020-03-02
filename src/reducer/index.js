import {combineReducers} from 'redux';
const baseState = {

}
const baseReducer = (state = baseState, action) => {
    return {
        ...state,
        title: action.title || '1221'
    }
};
const index = combineReducers({
    baseReducer
});
export default index;