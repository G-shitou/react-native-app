// import { fetch } from 'react-native';
import config from '../config';
import CookieManager from '@react-native-community/cookies';
const baseUrl = config.baseUrl;
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

// init url
function initUrl(url, params) {
    url = baseUrl + url;
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url;
}

function get(url, params) {
    let _url = initUrl(url, params);
    return new Promise(function (resolve, reject) {
        //fetch请求
        fetch(_url, {
            method: 'GET',
            headers
        })
        .then((response) => {
            // 登出操作，清除cookie
            if(url === '/user/logout/json'){
                CookieManager.clearAll().then((res) => {
                    console.log('CookieManager.clearAll =>', res);
                });
            }
            return response.json()
        })
        .then((json) => {
            resolve(json);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function post(url, params) {
     _url = initUrl(url, params);
    // const _url = baseUrl + url;
    return new Promise(function (resolve, reject) {
        //fetch请求
        fetch(_url, {
            method: 'POST',
            headers,
            // body:JSON.stringify(params)
        })
        .then((response) => {
            // 登录和注册状态下要将cookie本地持久化
            if(url === '/user/login' || url === '/user/register'){
                // console.log(response.headers.map['set-cookie']);
                CookieManager.setFromResponse('cookie', response.headers.map['set-cookie']).then((res) => {
                    // `res` will be true or false depending on success.
                    console.log('CookieManager.setFromResponse =>',res);
                });
            }
            return response.json()
        }).then((json) => {
            resolve(json);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export default {
    get,
    post
}