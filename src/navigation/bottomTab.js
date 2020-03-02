import * as React from 'react';
import { StyleSheet } from 'react-native';
// 引入 tabNavigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign'
// 引入页面
import Home from '../page/home';
import Square from '../page/square';
import WeChat from '../page/weChat';
import System from '../page/system';
import Project from '../page/project';
const Tab = createBottomTabNavigator();
// Tab 导航设置
function TabScreen() {
    return (
        <Tab.Navigator
            initialRouteName={'首页'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const colors = focused ? '#2D92FF' : '#6E6E6E';
                    let iconName;
                    if (route.name === '首页') {
                        iconName = 'home'
                    } else if (route.name === '广场') {
                        iconName = 'appstore-o';
                    } else if (route.name === '公众号') {
                        iconName = 'message1'
                    } else if (route.name === '体系') {
                        iconName = 'codepen';
                    } else {
                        iconName = 'profile'
                    }
                    return <Icon name={iconName} size={25} color={colors} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: '#2D92FF',
                inactiveTintColor: '#6E6E6E'
            }}
        >
            <Tab.Screen name="首页" component={Home} />
            <Tab.Screen name="广场" component={Square} />
            <Tab.Screen name="公众号" component={WeChat} />
            <Tab.Screen name="体系" component={System} />
            <Tab.Screen name="项目" component={Project} />
        </Tab.Navigator>
    );
}
export default TabScreen;