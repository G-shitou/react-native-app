import * as React from 'react';
import { StyleSheet } from 'react-native';
// 引入stackNavigator
import { createStackNavigator } from '@react-navigation/stack';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign'
// 引入Tab导航
import TabScreen from './bottomTab';
// 引入页面
import Search from '../page/search'
const Stack = createStackNavigator();
// Stack 导航设置
function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="首页"     //作为初始化页面、不写的话默认第一个screen为初始化页面
            mode='modal'
            headerMode='float'
            screenOptions={{                 //用来定制头部信息、根据自己需要更改
                headerStyle: {
                    backgroundColor: '#ee7530'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                }
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
        </Stack.Navigator>
    )
}
export default StackNavigator;

const styles = StyleSheet.create({
    headerRight: {
        color: '#fff',
        fontSize: 25,
        marginRight: 20,
    },
    headerLeft: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 20,
        marginRight: 0
    }
});