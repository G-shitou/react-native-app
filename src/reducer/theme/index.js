import type from '../../action/type';
import config from '../../config';

const theme = config.theme;
// 读取本地储存的皮肤信息,初始化themeState
const themeType = 'normal';


const themeState = {
    theme: theme[themeType]
}
const themeData = (state = themeState, action) => {
    switch (action.type) {
        // 刷新皮肤
        case type.THEME_TYPE:
            return {
                ...state,
                theme:theme[action.themeType]
            };
            break;
        default:
            return {...state};
    }
};

export default themeData;