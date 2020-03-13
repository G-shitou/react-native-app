import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import fetch from '../utils/fetch';
import { connect } from 'react-redux';
// 颜色数组
const colors = ['#eb2100', '#D0570E', '#D0A00E', '#0096F3', '#1FB246', '#6355F1', '#FF9080', '#00BFB7', '#765005', '#0B4C50'];
class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hotSearch:[],
      text:''
    }
  }

  UNSAFE_componentWillMount(){
    // 请求热门搜索
    this.getHotSearch();
  }

  // 搜索
  search = event => {
    const { navigation } = this.props;
    navigation.navigate('commonList',{
      title: event.nativeEvent.text,
      sourceType:'search',
      itemType:'article'
    })
  }

  // 搜索热门
  searchHot = item => {
    const { navigation } = this.props;
    navigation.navigate('commonList',{
      title: item.name,
      sourceType:'search',
      itemType:'article'
    })
  }

  // input onvaluechange
  changeValue = text => {
    this.setState({
      text:text
    })
  }

  // 请求热门搜索
  getHotSearch = () => {
    fetch.get('/hotkey/json').then(res => {
      this.setState({
        hotSearch:res.data
      });
    }).catch(err => { 
      console.log(err);
    })
  }

  // 随机生成颜色
  initColor = (index) => {
    let color = colors[index%colors.length]
    return color;
  }

  render() {
    return (
      <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <TextInput value={this.state.text} style={[styles.search_input,{color:this.props.theme.titleColor,borderColor:this.props.theme.borderColor}]} placeholder='发现更多干货' 
          placeholderTextColor={this.props.theme.subColor} onChangeText={text => this.changeValue(text)} 
          clearButtonMode='always' onSubmitEditing={this.search}></TextInput>
          {/* <Icon name='search1' style={{height:35,marginLeft:10}} size={18} onPress={this.search} color={this.props.theme.titleColor}/> */}
        </View>
        <Text style={[styles.content_title,{color:this.props.theme.themeColor}]}>热门搜索</Text>
        <View style={styles.hot_content}>
          {this.state.hotSearch.length > 0 && this.state.hotSearch.map((item,index) => {
            return <Text style={[styles.hot_tag,{color:this.initColor(index),backgroundColor:this.props.theme.subColor}]} key={item.id} onPress={() => this.searchHot(item)}>{item.name}</Text>
          })}
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
      theme: state.themeReducer.theme
  }
}
export default connect(mapStateToProps)(Search)
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:15,
  },
  search_input:{
    flex:1,
    height:30,
    lineHeight:30,
    padding:0,
    paddingLeft:20,
    fontSize:14,
    borderWidth:1,
    borderRadius:15,
    marginBottom:20,
  },
  content_title:{
    marginBottom:15,
    fontSize:16,
  },
  hot_content:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    flexWrap:'wrap',
  },
  hot_tag:{
    backgroundColor:'#D9D9D9',
    fontSize:14,
    fontStyle:'italic',
    padding:5,
    margin:5,
    borderRadius:5,
  },
});
