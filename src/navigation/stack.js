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
import Web from '../page/web';
const Stack = createStackNavigator();
// Stack 导航设置
class StackNavigator extends React.Component {
    render(){
        return (
            <Stack.Navigator
                initialRouteName="首页"     //作为初始化页面、不写的话默认第一个screen为初始化页面
                mode='modal'
                headerMode='float'
                screenOptions={{                 //用来定制头部信息、根据自己需要更改
                    headerStyle: {
                        backgroundColor: this.props.theme.themeColor,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 18,
                    },
                }}>

                <Stack.Screen name="首页" component={TabScreen}
                    options={({ route, navigation }) => ({
                        title: route && route.state && route.state.routeNames[route.state.index] || '首页',
                        headerRight: () => (
                            <Icon
                                name='search1'
                                style={styles.headerRight}
                                onPress={() => navigation.navigate('搜索')}
                            />
                        ),
                        headerLeft: () => (
                            <Icon
                                name='bars'
                                style={styles.headerLeft}
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    })} />
                <Stack.Screen name="搜索" component={Search}></Stack.Screen>
                <Stack.Screen name="webview" component={Web} 
                    options={({ route, navigation }) => ({
                        title: route.params.title
                    })}></Stack.Screen>
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
    }
});