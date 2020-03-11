import React from 'react';
import { connect } from 'react-redux';
import fetch from '../utils/fetch';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class System extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      refreshing:false,
    }
  }

  UNSAFE_componentWillMount(){
    this.getData();
  }

  // 下拉刷新
  onRefresh = () => {
    this.setState({
        refreshing:true
    })
    this.getData();
  }

  // 请求体系数据
  getData = () => {
    // 发送ajax
    fetch.get('/tree/json').then((res) => {
      // res.errorCode,errorMsg,data
      if(res.errorCode != 0){
        console.log(res);
      }else{
        this.setState({
            data: res.data,
            refreshing:false
        });
      }
    }).catch( error => {
      console.log(error);
    })
  }

  // 点击跳转页面
  onHandle = (item) => {
    const {navigation,route} = this.props;
    navigation.navigate('toptab',{
      title:item.name,
      path:'system',
      item
    })
  }

  render() {
    return (
      this.state.data.length > 0 ?
        <FlatList style={styles.container}
          ref={(flatList)=>this._flatList = flatList}
          refreshControl={
            <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this.onRefresh}
               colors={[this.props.theme.loadingColor]}
               progressBackgroundColor={this.props.theme.backgroundColor}
           />}
          data={this.state.data}
          renderItem={({item,index}) => {
            return <TouchableHighlight key={item.id} onPress={() => this.onHandle(item)}>
              <View style={[styles.item,{borderBottomColor: this.props.theme.borderColor,backgroundColor:this.props.theme.backgroundColor}]}>
                <View style={styles.item_content}>
                  <Text style={{color:this.props.theme.titleColor,fontSize:16,marginTop:10,marginBottom:10}}>{item.name}</Text>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',flexWrap:'wrap',marginBottom:5}}>
                    {item.children.map(_item => <Text key={_item.id} style={{color:this.props.theme.subColor,fontSize:14,marginRight:15}}>{_item.name}</Text>)}
                  </View>
                </View>
                <Icon style={styles.icon} name="right" size={16} color={this.props.theme.titleColor}/>
              </View>
            </TouchableHighlight>
          }}>
        </FlatList> : <ActivityIndicator style={styles.loading} size="large" color={this.props.theme.loadingColor}/>
    );
  }
};
const mapStateToProps = state => {
  return {
      theme: state.themeReducer.theme,
      score: state.baseReducer.score,
  }
}
export default connect(mapStateToProps)(System)
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  item:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:20,
    borderBottomWidth:0.5,
  },
  item_content:{
    flex:1,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'flex-start',
    overflow:'hidden',
  },
  item_icon:{
    width:30
  }
});
