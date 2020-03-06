// 请求头
const baseUrl = 'https://www.wanandroid.com';
// 主题
const theme = {
    'normal1':{
        subColor:'gray',           // 文章除title外字体颜色
        titleColor:'#000',         // 文章标题颜色
        themeColor:'#2D92FF',      // 主题颜色
        borderColor: '#D9D9D9',    // border颜色
        backgroundColor: '#fff',   // view背景颜色
        loadingColor: '#2D92FF',   // 加载中颜色
    },
    'normal':{
        subColor:'gray',
        titleColor:'#fff', 
        themeColor:'#1BA05F', 
        borderColor: 'gray',
        backgroundColor: '#333',
        loadingColor: '#1BA05F',
    }
}
export default {
    baseUrl,
    theme
}