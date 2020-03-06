import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../action/login'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class MenuList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menuList:[{
        icon:'pay-circle-o1',
        title:'我的积分'
      },{
        icon:'hearto',
        title:'我的收藏'
      },{
        icon:'sharealt',
        title:'我的分享'
      },{
        icon:'calendar',
        title:'TODO'
      },{
        icon:'cloudo',
        title:'夜间模式'
      },{
        icon:'setting',
        title:'系统设置'
      }]
    }
  }

  // 点击去登陆
  login = () => {
    const {navigation} = this.props;
    navigation.navigate('login',{title:'登陆'})
  }

  // 点击登出
  logout = () => {
    this.props.dispatch(logout()).then(res=>{
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <ScrollView style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
        <View style={[styles.user,{backgroundColor:this.props.theme.themeColor}]}>
          <View style={styles.user_img}>
            <Icon name='user' size={40} color='#fff'/>
          </View>
          {/* 判断显示用户名或去登录 */}
          {this.props.userinfo ? <Text style={{color:'#fff',fontSize:18}}>{this.props.userinfo.username}</Text> :
            <Text style={{color:'#fff',fontSize:18}} onPress={this.login}>去登陆</Text>}
          {this.props.score ? <Text style={{color:'#fff',fontSize:14,marginBottom:10}}>{`等级:${this.props.score.level}  排名:${this.props.score.rank}`}</Text>: 
            <Text style={{color:'#fff',fontSize:14,marginBottom:10}}>{`等级:${'~ '}  排名:${'~'}`}</Text>}
        </View>
        {this.state.menuList.map(item => (
          <TouchableHighlight key={item.title}>
            <View style={styles.list}>
              <Icon style={styles.list_icon} name={item.icon} size={20} color={this.props.theme.themeColor}/>
              <Text style={[styles.list_title,{color:this.props.theme.titleColor}]} >{item.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
        <TouchableHighlight onPress={this.logout}>
            <View style={styles.list}>
              <Icon style={styles.list_icon} name='logout' size={20} color={this.props.theme.themeColor}/>
              <Text style={[styles.list_title,{color:this.props.theme.titleColor}]} >退出登录</Text>
            </View>
          </TouchableHighlight>
      </ScrollView>
    );
  }
};
const mapStateToProps = state => {
  return {
      theme: state.themeReducer.theme,
      userinfo: state.baseReducer.userinfo,
      score: state.baseReducer.score
  }
}
export default connect(mapStateToProps)(MenuList)
const styles = StyleSheet.create({
  container:{
    flex:1,
    display:'flex',
  },
  user:{
    height:200,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    overflow:'hidden'
  },
  user_img:{
    height:80,
    width:80,
    marginTop:40,
    marginBottom:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'gray',
    borderRadius:40
  },
  list:{
    height:50,
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  list_icon:{
    marginLeft:25,
    marginRight:25,
  },
  list_title:{
    fontSize:16
  }
});
