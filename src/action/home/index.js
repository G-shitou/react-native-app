import fetch from '../../utils/fetch';
import type from '../type';
export function banner(banner) {
    return {
        type:type.HOME_BANNER,
        banner
    }
}
export function article(article) {
    return {
        type:type.HOME_ARTICLE,
        article
    }
}
export function pageNum(pageNum) {
    return {
        type:type.HOME_PAGENUM,
        pageNum
    }
}
export function pageCount(pageCount) {
    return {
        type:type.HOME_PAGECOUNT,
        pageCount
    }
}
// 获取首页banner
export function getBanner(){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            fetch.get('/banner/json').then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    dispatch(banner(res.data));
                    resolve();
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}
// 获取首页文章列表
export function getArticle(params){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            const state = getState().homeReducer;
            // 这里需要添加判断是否时是后一页
            if(state.pageCount == params.pageNum + 1){
                // 提示信息
                reject({msg:'已经到底啦!'});
                return;
            }
            // 用页码构造地址
            const url = `/article/list/${params.pageNum}/json`;
            fetch.get(url).then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    let article;
                    // 如果不是刷新第一页,则concat数组
                    if(params.pageNum !== 0){
                        article = res.data.datas.concat(state.article);
                    }else{
                        article = res.data.datas;
                    }
                    // 刷新文章
                    dispatch(article(article))
                    // 刷新总页码
                    dispatch(pageCount(res.data.pageCount));
                    // 刷新当前页码
                    dispatch(pageNum(params.pageNum));
                    resolve();
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}