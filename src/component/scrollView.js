import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ActionButton from 'react-native-action-button';

// 屏幕
const win = Dimensions.get('window');
// 颜色数组
const colors = ['#eb2100', '#D0570E', '#D0A00E', '#0096F3', '#1FB246', '#6355F1', '#FF9080', '#00BFB7', '#765005', '#0B4C50'];
class NewScrollView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:false,
      isShowToTop:false,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.state.refreshing){
        this.setState({
            refreshing: false
        })
    }
  }

  // 下拉刷新
  onRefresh = () => {
    this.setState({
        refreshing:true
    })
    this.props.getData();
  }

  // 随机生成颜色
  initColor = (index) => {
    let color = colors[index%colors.length];
    return color;
  }

  // 点击跳转页面
  onHandle = (item) => {
    const navigation = this.props.navigation;
    if(this.props.type === 'system'){
        navigation.navigate('toptab',{
            title:item.name,
            path:'system',
            item
        })
    }else if(this.props.type === 'navigate'){
        navigation.navigate('webview',{
            title: item.title,
            url: item.link
        })
    }
  }

  // 滚动监听
  onScroll = (event) => {
    let offsetTop = event.nativeEvent.contentOffset.y;
    // 减去header和tab-bottom的高度
    if(offsetTop >= win.height-100){
        !this.state.isShowToTop && this.setState({isShowToTop:true});
    }else{
        this.state.isShowToTop && this.setState({isShowToTop:false});
    }
  }

  render() {
    return (
      this.props.data.length > 0 ?
        <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
        <ScrollView style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}
          ref={(scrollview)=>this._scrollview = scrollview}
          onScroll={this.onScroll}
          refreshControl={
            <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this.onRefresh}
               scrollEventThrottle={100}
               colors={[this.props.theme.themeColor || '#2D92FF']}
               progressBackgroundColor={this.props.theme.backgroundColor}
           />}
        >
            {this.props.type === 'system' ? this.props.data.map( item => {
                return <TouchableHighlight key={item.id} onPress={() => this.onHandle(item)}>
                    <View style={[styles.system_item,{borderBottomColor: this.props.theme.borderColor,backgroundColor:this.props.theme.backgroundColor}]}>
                        <View style={styles.system_item_content}>
                        <Text style={{color:this.props.theme.titleColor,fontSize:16,marginTop:10,marginBottom:10}}>{item.name}</Text>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',flexWrap:'wrap',marginBottom:5}}>
                            {item.children.map(_item => <Text key={_item.id} style={{color:this.props.theme.subColor,fontSize:14,marginRight:15}}>{_item.name}</Text>)}
                        </View>
                        </View>
                        <Icon style={styles.system_icon} name="right" size={16} color={this.props.theme.titleColor}/>
                    </View>
                    </TouchableHighlight>
                }) : this.props.data.map( item => {
                    return <View key={item.cid} style={[styles.navigate_item,{borderBottomColor: this.props.theme.borderColor,backgroundColor:this.props.theme.backgroundColor}]}>
                        <Text style={{color:this.props.theme.titleColor,fontSize:16,marginTop:10,marginBottom:10}}>{item.name}</Text>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',flexWrap:'wrap',marginBottom:5}}>
                            {item.articles.map((item,index) => 
                                <TouchableHighlight key={item.id} onPress={() => this.onHandle(item)}>
                                    <Text key={item.id} style={[styles.navigate_link,{color:this.initColor(index),backgroundColor:this.props.theme.tagColor}]}>{item.title}</Text>
                                </TouchableHighlight>)}
                        </View>
                    </View>
                }) 
            }
        </ScrollView>
        {this.state.isShowToTop && <ActionButton
            size={50}
            buttonColor={this.props.theme.themeColor}
            onPress={() => {
                this._scrollview.scrollTo({animated: true, x: 0, y: 0}); //跳转到顶部
            }}
            renderIcon={() => (
                <Icon style={styles.goUp} name="arrowup" size={24} color='#fff'/>
            )}
        />}
        </View> : <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
          <ActivityIndicator style={[styles.loading,{marginTop:win.height/2-100}]} size="large" color={this.props.theme.themeColor}/></View>
    );
  }
};
const mapStateToProps = state => {
  return {
      theme: state.themeReducer.theme,
      score: state.baseReducer.score,
  }
}
export default connect(mapStateToProps)(NewScrollView)
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  system_item:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:20,
    borderBottomWidth:0.5,
  },
  system_item_content:{
    flex:1,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'flex-start',
    overflow:'hidden',
  },
  system_item_icon:{
    width:30
  },
  navigate_item:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth:0.5,
  },
  navigate_link:{
    fontSize:14,
    fontStyle:'italic',
    padding:5,
    margin:5,
    borderRadius:5,
  }
});
