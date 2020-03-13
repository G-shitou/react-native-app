import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
// 引入stackNavigator
import { createStackNavigator } from '@react-navigation/stack';
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
// toptab 复用
import Toptab from './topTab';
const Stack = createStackNavigator();
const tabNames = ['首页','广场','公众号','体系导航','项目'];
// Stack 导航设置
class StackNavigator extends React.Component {
    render(){
        return (
            <Stack.Navigator
                initialRouteName="home"     //作为初始化页面、不写的话默认第一个screen为初始化页面
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
                    }
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