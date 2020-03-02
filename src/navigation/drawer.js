import * as React from 'react';
import { StyleSheet } from 'react-native';
// 引入 drawerNavigator
import { createDrawerNavigator } from '@react-navigation/drawer';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign';
// 引入stack导航
import StackNavigator from './stack';
const Drawer = createDrawerNavigator();
function DrawerScreen() {
    return (
        <Drawer.Navigator initialRouteName="首页"
            drawerContent={({ state, navigation, descriptors, progress }) => {
                return <Icon
                    name='search1'
                    onPress={() => navigation.toggleDrawer()}
                />
            }}>
            {/* 抽屉导航 */}
            <Drawer.Screen name="首页" component={StackNavigator} />
        </Drawer.Navigator>
    )
}
export default DrawerScreen;