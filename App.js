import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign'
// 引入react-native-gesture-handler
import 'react-native-gesture-handler';
// 引入 navigationContainer
import { NavigationContainer } from '@react-navigation/native';
// 引入stackNavigator
import { createStackNavigator } from '@react-navigation/stack';
// 引入 tabNavigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 引入 drawerNavigator
import { createDrawerNavigator } from '@react-navigation/drawer';

// 引入页面
import Home from './src/page/home';
import Square from './src/page/square';
import WeChat from './src/page/weChat';
import System from './src/page/system';
import Project from './src/page/project';
import Setting from './src/page/setting';
import Search from './src/page/search';
// 引入 AppStackNavigator
// import AppStackNavigator from './src/navigation';
// 引入 
// 定义tab，stack，drawer
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        inactiveTintColor: '#6E6E6E',
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
// Stack 导航设置
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="tab"     //作为初始化页面、不写的话默认第一个screen为初始化页面
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

      <Stack.Screen name="tab" component={TabScreen} 
        options={( {route,navigation} ) => ({
          title: route&&route.state&&route.state.routeNames[route.state.index] || '首页',
          headerRight:() => (
            <Icon
              name='search1'
              style={styles.headerRight}
              onPress={() => navigation.navigate('搜索')}
            />
          ),
          headerLeft:()=>(
            <Icon
              name='bars'
              style={styles.headerLeft}
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}/>
      <Stack.Screen name="搜索" component={Search}></Stack.Screen>
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="stack">
        {/* 抽屉导航 */}
        <Drawer.Screen name="stack" component={StackNavigator} />
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  headerRight:{
    color:'#fff',
    fontSize:25,
    marginRight:20,
  },
  headerLeft:{
    color:'#fff',
    fontSize:25,
    marginLeft:20,
    marginRight:0
  }
});
