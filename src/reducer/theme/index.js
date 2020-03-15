import type from '../../action/type';
let themeState = {
    theme:{
        subColor:'gray',           // 文章除title外字体颜色
        titleColor:'#000',         // 文章标题颜色
        // themeColor:'#2D92FF',      // 主题颜色
        themeColor:'',
        borderColor: '#D9D9D9',    // border颜色
        backgroundColor: '#fff',   // view背景颜色
        // loadingColor: '#2D92FF',   // 加载中颜色
        tagColor: '#D9D9D9',
    }
}
const themeData = (state = themeState, action) => {
    switch (action.type) {
        // 主题
        case type.THEME:
            let _theme = JSON.parse(JSON.stringify(action.theme));
            _theme.themeColor = state.theme.themeColor;
            return {
                ...state,
                theme:_theme
            };
            break;
        // 主题颜色
        case type.THEME_COLOR:
            let item = JSON.parse(JSON.stringify(state.theme));
            item.themeColor = action.themeColor;
            return {
                ...state,
                theme: item
            };
            break;
        default:
            return {...state};
    }
};

export default themeData;