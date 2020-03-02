import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import WeChat from '../page/weChat';
import System from '../page/system';
// topTab navigator
function TopTab() {
  return (
    <Tab.Navigator initialRouteName='弘扬'>
      <Tab.Screen name="弘扬" component={WeChat} />
      <Tab.Screen name="民族" component={System} />
      <Tab.Screen name="文化" component={WeChat} />
      <Tab.Screen name="发展" component={System} />
      <Tab.Screen name="时代" component={WeChat} />
      <Tab.Screen name="精神" component={System} />
    </Tab.Navigator>
  );
}
export default TopTab;