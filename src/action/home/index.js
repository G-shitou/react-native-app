import fetch from '../../utils/fetch';
import type from '../type';
export function banner(banner) {
    return {
        type:type.HOME_BANNER,
        banner
    }
}
export function topArticle(article) {
    return {
        type:type.HOME_TOPARTICLE,
        article
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
                    resolve(res);
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}

// 获取首页置顶文章
export function getTopArticle(){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            fetch.get('/article/top/json').then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    dispatch(topArticle(res.data));
                    resolve(res);
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
            if(state.pageCount === params.pageNum){
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
                    let articles;
                    // 如果不是刷新第一页,则concat数组
                    if(params.pageNum !== 0){
                        articles = state.article.concat(res.data.datas);
                    }else{
                        articles = res.data.datas;
                    }
                    // 刷新文章
                    dispatch(article(articles))
                    // 刷新总页码
                    dispatch(pageCount(res.data.pageCount));
                    // 刷新当前页码
                    dispatch(pageNum(params.pageNum));
                    resolve(res);
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}
// 首页收藏或取消收藏文章
export function collectArticle(params){
    return (dispatch, getState) => {
        let state = getState().homeReducer,
            index = params.index,
            id,
            url,
            toastInfo,
            newList;
        // 文章是由推荐和普通的列表
        if(index < state.topArticle.length){
            newList = JSON.parse(JSON.stringify(state.topArticle));
            id = newList[index].id;
            url = newList[index].collect ? `/lg/uncollect_originId/${id}/json` : `/lg/collect/${id}/json`;
            toastInfo = newList[index].collect ? '取消收藏成功' : '收藏成功';
            newList[index].collect = !newList[index].collect;
        }else{
            newList = JSON.parse(JSON.stringify(state.article));
            id = newList[index-state.topArticle.length].id;
            url = newList[index-state.topArticle.length].collect ? `/lg/uncollect_originId/${id}/json` : `/lg/collect/${id}/json`;
            toastInfo = newList[index-state.topArticle.length].collect ? '取消收藏成功' : '收藏成功';
            newList[index-state.topArticle.length].collect = !newList[index-state.topArticle.length].collect;
        }
        return new Promise(function (resolve, reject) {
            fetch.post(url).then((res) => {
                // res.errorCode,errorMsg,data
                if(res.errorCode != 0){
                    reject({msg:res.errorMsg || '请求错误!',errorCode:res.errorCode})
                }else{
                    // 更新对应的artcle数组
                    if(index < state.topArticle.length){
                        dispatch(topArticle(newList));
                    }else{
                        dispatch(article(newList));
                    }
                    resolve({msg:toastInfo});
                }
            }).catch( error => {
                reject({msg:'网络错误!',code:error});
            })
        })
    }
}