import type from '../../action/type';
const homeState = {
    banner:[],
    article:[],
    pageCount:undefined,
    pageNum:undefined
}
const homeData = (state = homeState, action) => {
    switch (action.type) {
        // 刷新banner
        case type.HOME_BANNER:
            return {
                ...state,
                banner:action.banner
            };
            break;
        // 刷新article
        case type.HOME_ARTICLE:
            return {
                ...state,
                article:action.article
            };
            break;
        // 刷新页码
        case type.HOME_PAGENUM:
            return {
                ...state,
                pageNum:action.pageNum
            }
            break;
        // 刷新总页码
        case type.HOME_PAGECOUNT:
            return {
                ...state,
                pageCount:action.pageCount
            }
            break;
        default:
            return {...state};
    }
};

export default homeData;