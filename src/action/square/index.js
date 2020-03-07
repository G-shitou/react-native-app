import fetch from '../../utils/fetch';
import type from '../type';
export function article(article) {
    return {
        type:type.SQUARE_ARTICLE,
        article
    }
}
export function pageNum(pageNum) {
    return {
        type:type.SQUARE_PAGENUM,
        pageNum
    }
}
export function pageCount(pageCount) {
    return {
        type:type.SQUARE_PAGECOUNT,
        pageCount
    }
}

// 获取广场文章列表
export function getArticle(params){
    return (dispatch, getState) => {
        return new Promise(function (resolve, reject) {
            const state = getState().squareReducer;
            // 这里需要添加判断是否时是后一页
            if(state.pageCount === params.pageNum){
                // 提示信息
                reject({msg:'已经到底啦!'});
                return;
            }
            // 用页码构造地址
            const url = `/user_article/list/${params.pageNum}/json`;
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