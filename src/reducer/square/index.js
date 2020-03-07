import type from '../../action/type';
const squareState = {
    article:[],
    pageCount:undefined,
    pageNum:undefined
}
const squareData = (state = squareState, action) => {
    switch (action.type) {
        // 刷新article
        case type.SQUARE_ARTICLE:
            return {
                ...state,
                article:action.article
            };
            break;
        // 刷新页码
        case type.SQUARE_PAGENUM:
            return {
                ...state,
                pageNum:action.pageNum
            }
            break;
        // 刷新总页码
        case type.SQUARE_PAGECOUNT:
            return {
                ...state,
                pageCount:action.pageCount
            }
            break;
        default:
            return {...state};
    }
};

export default squareData;