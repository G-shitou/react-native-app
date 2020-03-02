// 引入createStore创建store
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
// 引入所有的reducer
import reducer from '../reducer';

const store = () => createStore(reducer, applyMiddleware(thunk));

export default store;