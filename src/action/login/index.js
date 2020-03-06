import fetch from '../../utils/fetch';
import type from '../type';
export function userinfo(userinfo) {
    return {
        type:type.USERINFO,
        userinfo
    }
}
export function score(score) {
    return {
        type:type.SCORE,
        score
    }
}
// 登录
export function login(params){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            fetch.post('/user/login',params).then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    // 更新用户信息
                    dispatch(userinfo(res.data));
                    // 获取积分信息
                    dispatch(getScore());
                    resolve();
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}

// 注册
export function register(params){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            fetch.post('/user/register',params).then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    // 更新用户信息
                    dispatch(userinfo(res.data));
                    // 获取积分信息
                    dispatch(getScore());
                    resolve();
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}

// 登出
export function logout(){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            fetch.get('/user/logout/json').then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    // 重置用户信息
                    dispatch(userinfo(''));
                    dispatch(score(''));
                    resolve();
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}

// 获取个人积分
export function getScore(){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            fetch.get('/lg/coin/userinfo/json').then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    dispatch(score(res.data));
                    resolve();
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}