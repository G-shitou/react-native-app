import * as React from 'react';
import { StyleSheet } from 'react-native';
// 引入 drawerNavigator
import { createDrawerNavigator } from '@react-navigation/drawer';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign';
// 引入stack导航
import StackNavigator from './stack';
import MenuList from '../page/drawerMenu';
const Drawer = createDrawerNavigator();
function DrawerScreen() {
    return (
        <Drawer.Navigator initialRouteName="home"
            drawerContent={({ state, navigation, descriptors, progress }) => {
                return <MenuList navigation={navigation}></MenuList>
            }}>
            {/* 抽屉导航 */}
            <Drawer.Screen name="home" component={StackNavigator} />
        </Drawer.Navigator>
    )
}
export default DrawerScreen;