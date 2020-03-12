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
                initialRouteName={'home'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const colors = focused ? this.props.theme.themeColor : this.props.theme.subColor;
                        let iconName;
                        if (route.name === 'home') {
                            iconName = 'home'
                        } else if (route.name === 'square') {
                            iconName = 'appstore-o';
                        } else if (route.name === 'wechat') {
                            iconName = 'message1'
                        } else if (route.name === 'systemNavigation') {
                            iconName = 'codepen';
                        } else {
                            iconName = 'profile'
                        }
                        return <Icon style={{marginTop:5}} name={iconName} size={25} color={colors} />;
                    },
                    title:route.params.title
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
                <Tab.Screen name="home" component={Home} initialParams={{title:'首页'}}/>
                <Tab.Screen name="square" component={List} initialParams={{sourceType:'square',itemType:'article',title:'广场'}} />
                <Tab.Screen name="wechat" initialParams={{path:'wechat',title:'公众号'}} component={TopTab} />
                <Tab.Screen name="systemNavigation" initialParams={{path:'systemNavigation',title:'体系导航'}} component={TopTab} />
                <Tab.Screen name="project" initialParams={{path:'project',title:'项目'}} component={TopTab} />
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