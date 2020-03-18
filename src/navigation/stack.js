import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
// 引入stackNavigator
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign'
// 引入Tab导航
import TabScreen from './bottomTab';
// 引入页面
import Search from '../page/search';
import Webview from '../page/webview';
import Login from '../page/login';
import Share from '../page/share';
import CommonList from '../component/commonList';
import Score from '../page/score';
import Setting from '../page/setting';
import Advertisement from '../page/advertisement';
// 初始化使用
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
import { login, theme, themeColor } from '../action/login'
// toptab 复用
import Toptab from './topTab';
const Stack = createStackNavigator();
const tabNames = ['首页','广场','公众号','体系导航','项目'];
// Stack 导航设置
class StackNavigator extends React.Component {
    UNSAFE_componentWillMount(){
        // 判断是否有cookie，如果有自动登录
      CookieManager.get('cookie').then((res) => {
        if(JSON.stringify(res) != '{}'){
          this.props.dispatch(login()).then(res=>{
  
          }).catch(err => {
            console.log(err);
          })
        }
      });
      // 读取本地储存的皮肤信息,初始化themeState
      const _theme = config.theme;
      let themeType;
      AsyncStorage.getItem('themeType').then(res => {
          themeType = res || 'day';
          // theme[themeType]
          this.props.dispatch(theme(_theme[themeType]))
      });
      // 主题颜色
      AsyncStorage.getItem('themeColor').then(res => {
        let color = res || '#2D92FF';
        this.props.dispatch(themeColor(color));
      })
    }
    render(){
        return (
            <Stack.Navigator
                initialRouteName="advertisement"     //作为初始化页面、不写的话默认第一个screen为初始化页面
                mode='modal'
                headerMode='float'
                screenOptions={{                 //用来定制头部信息、根据自己需要更改
                    headerStyle: {
                        backgroundColor: this.props.theme.themeColor,
                        borderBottomWidth: 0,
                        elevation: 0,
                        // height:45,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 18,
                    },
                    // 添加这一行会实现安卓下页面的左右切换，默认是从下到上
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}>

                <Stack.Screen name="home" component={TabScreen}
                    options={({ route, navigation }) => ({
                        title: route && route.state && tabNames[route.state.index] || '首页',
                        headerRight: () => {
                            if(route && route.state && route.state.index == 1){
                                return <Icon name='plus' style={styles.headerRight} onPress={() => navigation.navigate('share',{title:'分享文章'})} />
                            }else{
                                return <Icon name='search1' style={styles.headerRight} onPress={() => navigation.navigate('search',{title:'搜索'})} />
                            }
                        },
                        headerLeft: () => (
                            <Icon
                                name='bars'
                                style={styles.headerLeft}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    })} />
                <Stack.Screen name="search" component={Search} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="login" component={Login} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="webview" component={Webview} options={({ route, navigation }) => ({title: route.params.title,})}></Stack.Screen>
                <Stack.Screen name="toptab" component={Toptab} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="share" component={Share} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="commonList" component={CommonList} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="score" component={Score} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="setting" component={Setting} options={({ route, navigation }) => ({title: route.params.title})}></Stack.Screen>
                <Stack.Screen name="advertisement" component={Advertisement} options={{headerShown:false,headerModeprop:'screen'}}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}
const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme,
    }
}
export default connect(mapStateToProps)(StackNavigator)
// export default StackNavigator;

const styles = StyleSheet.create({
    headerRight: {
        color: '#fff',
        fontSize: 20,
        marginRight: 20,
    },
    headerLeft: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 0
    },
});