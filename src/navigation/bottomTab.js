import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
// 引入 tabNavigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign'
// 引入topTab Screen
import TopTab from './topTab';
// 引入页面
import Home from '../page/home';
// 通用list页面
import List from '../component/commonList';
const Tab = createBottomTabNavigator();
// Tab 导航设置
class TabScreen extends React.Component {
    render(){
        return (
            <Tab.Navigator
                initialRouteName={'首页'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const colors = focused ? this.props.theme.themeColor : this.props.theme.subColor;
                        let iconName;
                        if (route.name === '首页') {
                            iconName = 'home'
                        } else if (route.name === '广场') {
                            iconName = 'appstore-o';
                        } else if (route.name === '公众号') {
                            iconName = 'message1'
                        } else if (route.name === '体系导航') {
                            iconName = 'codepen';
                        } else {
                            iconName = 'profile'
                        }
                        return <Icon style={{marginTop:5}} name={iconName} size={25} color={colors} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: this.props.theme.themeColor,
                    inactiveTintColor: this.props.theme.subColor,
                    style:{
                        height:50,
                        paddingBottom:0,
                        backgroundColor:this.props.theme.backgroundColor
                    }
                }}
            >
                <Tab.Screen name="首页" component={Home} />
                <Tab.Screen name="广场" component={List} initialParams={{sourceType:'square',itemType:'article'}} />
                <Tab.Screen name="公众号" initialParams={{path:'wechat'}} component={TopTab} />
                <Tab.Screen name="体系导航" initialParams={{path:'systemNavigation'}} component={TopTab} />
                <Tab.Screen name="项目" initialParams={{path:'project'}} component={TopTab} />
            </Tab.Navigator>
        );
    }
}
const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme,
    }
}
export default connect(mapStateToProps)(TabScreen)

const styles = StyleSheet.create({
    
});