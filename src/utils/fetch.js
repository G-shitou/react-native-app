// import { fetch } from 'react-native';
import config from '../config';
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
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((json) => {
            resolve(json);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function post(url, params) {
    const _url = baseUrl + url;
    return new Promise(function (resolve, reject) {
        //fetch请求
        fetch(_url, {
            method: 'POST',
            headers,
            body:JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((json) => {
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