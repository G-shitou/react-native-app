import * as React from 'react';
import { connect } from 'react-redux';
import fetch from '../utils/fetch';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import List from '../component/commonList';
import System from '../page/system';
import Navigate from '../page/navigate';

// 屏幕
const win = Dimensions.get('window');
// topTab navigator
class TopTab extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      routerArry:[]
    }
  }
  UNSAFE_componentWillMount(){
    if(this.props.route.params.path === 'systemNavigation'){
      this.setState({
        routerArry:[{
          id: 1,
          name: "体系",
          component:'system'
        },{
          id:2,
          name:"导航",
          component:'navigate'
        }]
      })
    }else if(this.props.route.params.path === 'system'){
      this.setState({
        routerArry:this.props.route.params.item.children
      })
    } else {
      // 请求路由
      this.getRouter();
    }
  }

  // 请求路由
  getRouter = () => {
    const { navigation, route } = this.props;
    let url;
    if(route.params.path === 'wechat'){
      url = '/wxarticle/chapters/json';
    }else if(route.params.path === 'project'){
      url = '/project/tree/json';
    }
    fetch.get(url).then(res => {
      console.log('toptab路由更新')
      this.setState({
        routerArry:res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render(){
    const Tab = createMaterialTopTabNavigator();
    const {navigation,route} = this.props;
    return (
      this.state.routerArry.length > 0 ? 
        <Tab.Navigator  lazy={true} swipeEnabled={true} initialRouteName={this.state.routerArry[0].name} tabBarOptions={{
          activeTintColor: '#fff',  //标签栏激活字体颜色
          inactiveTintColor: '#fff',//标签栏未激活字体颜色
          showLabel: true,             //是否显示标签栏
          labelStyle: {fontSize: 14},  //标签样式(可设置字体大小等)
          showIcon: false,              //是否显示标签栏上图标
          scrollEnabled: true,        //是否可以滚动标签栏目(当tab总数超过一屏)
          indicatorStyle: {         //指示器样式 height：0则不显示
            height: 2,
            backgroundColor:'#fff'
          },
          style: {                    //设置整个tabbar样式(背景颜色等)
            backgroundColor: this.props.theme.themeColor,
            paddingBottom:0,
            margin:0,
          }, 
          tabStyle:{   //设置单个tabbar样式
            height:35,
            width:this.props.route.params.path === 'systemNavigation' ? win.width/2 : 'auto',
            marginTop:0,
            paddingTop:0
          },
        }}>
          { this.state.routerArry.map(item => {
              // 其他toptab
              if(route.params.path !== 'systemNavigation'){
                return <Tab.Screen name={item.name} component={List} key={item.id} 
                initialParams={{sourceType:route.params.path,id:item.id,itemType:route.params.path === 'project' ?  'project' :'article'}} />
              }else{
                // 体系与导航
                return <Tab.Screen name={item.name} component={item.component === 'system' ? System : Navigate} key={item.id} />
              }
            })
          }
        </Tab.Navigator> : <View style={{flex:1,backgroundColor:this.props.theme.backgroundColor}}>
          <ActivityIndicator size='large' color={this.props.theme.themeColor} style={{marginTop:win.height/2-100}} />
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
      theme: state.themeReducer.theme,
  }
}
export default connect(mapStateToProps)(TopTab);