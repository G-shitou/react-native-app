import type from '../../action/type';
let themeState = {
    theme:{}
}
const themeData = (state = themeState, action) => {
    console.log(action);
    switch (action.type) {
        // 主题
        case type.THEME:
            return {
                ...state,
                theme: action.theme
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