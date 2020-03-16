import React from 'react';
import { connect } from 'react-redux';
import fetch from '../utils/fetch';
import Swiper from 'react-native-swiper';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  AppRegistry,
  Platform,
  Linking,
} from 'react-native';
// 引入热更新
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';
import FlatList from '../component/flatList';
import Toast from '../component/toast';

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      banner:[],
      topArticle: [],
      article:[],
      pageCount:undefined,
      pageNum:undefined
    }
  }

  UNSAFE_componentWillMount(){
    this.onRefresh();
    // 检测app是否有最新版本
    this._checkUpdate()
    // 每次更新第一次启动,需要marksuccess，避免回滚
    if (isFirstTime) {
      markSuccess();
    }
  }

  // 检测是否有最新版本
  _checkUpdate = () => {
    if (__DEV__) {
      // 开发模式不支持热更新，跳过检查
      return;
    }
    let info;
    try {
      info = checkUpdate(appKey);
    } catch (err) {
      console.warn(err);
      return;
    }
    if (info.expired) {
      Alert.alert('提示', '您的当前版本已过期,请前往应用商店下载新的版本', [
        {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
      ]);
    } else if(info.update){
      Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
        {text: '是', onPress: ()=>{this.doUpdate(info)}},
        {text: '否',},
      ]);
    }
  };

  // 开始下载更新
  doUpdate = (info) => {
    try {
      const hash = downloadUpdate(info);
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {text: '是', onPress: ()=>{switchVersion(hash);}},
        {text: '否',},
        {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
      ]);
    } catch(err) {
      Alert.alert('提示', '更新失败.');
    }
  };

  // 登录和未登录状态切换,或者切换用户之后需要刷新数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.score.userId !== nextProps.score.userId){
      console.log('用户变更,刷新数据');
      this.onRefresh();
    }
  }

  // 请求推荐文章列表
  getTopArticleList = () => {
    fetch.get('/article/top/json').then((res) => {
      // res.errorCode,errorMsg,data
      if(res.errorCode != 0){
        console.log(res);
      }else{
        this.setState({
          topArticle:res.data
        })
      }
    }).catch( error => {
        console.log(error);
    })
  }

  // 请求文章列表
  getArticleList = (num) => {
    const pageNum = typeof(num) === 'number' ? num : typeof(this.state.pageNum) === 'undefined' ? 0 : (this.state.pageNum + 1);
    // 这里需要添加判断是否时是后一页
    if(this.state.pageCount === pageNum){
      return;
    }
    // 用页码构造地址
    const url = `/article/list/${pageNum}/json`;
    fetch.get(url).then((res) => {
      // res.errorCode,errorMsg,data
      if(res.errorCode != 0){
        console.log(res);
      }else{
        let articles;
        // 如果不是刷新第一页,则concat数组
        if(pageNum !== 0){
          articles = this.state.article.concat(res.data.datas);
        }else{
          articles = res.data.datas;
        }
        this.setState({
          article:articles,
          pageCount:res.data.pageCount,
          pageNum
        })
      }
    }).catch( error => {
      console.log(error);
    })
  }

  // 请求banner数据
  getBannerDate = () => {
    fetch.get('/banner/json').then((res) => {
      // res.errorCode,errorMsg,data
      if(res.errorCode != 0){
        console.log(res)
      }else{
        this.setState({
          banner:res.data
        })
      }
    }).catch( error => {
      console.log(error);
    })
  }

  // 点击banner跳转
  handleBanner = (item) => {
    const { navigation } = this.props;
    navigation.navigate('webview',{
      title:item.title,
      url:item.url
    });
  }

  // 刷新页面
  onRefresh = () => {
    // 刷新数据
    this.getBannerDate();
    this.getTopArticleList();
    this.getArticleList(0);
  }

  // 加载更多
  loadmore = () => {
    console.log('加载更多')
    this.getArticleList();
  }

  // 点击收藏或取消收藏
  handleCollect = (index) => {
    // 判断是否登录
    if(this.props.score && this.props.score.userId){
      let newList,collectItem;
      // 文章是由推荐和普通的列表
      if(index < this.state.topArticle.length){
        newList = JSON.parse(JSON.stringify(this.state.topArticle));
        collectItem = newList[index];
      }else{
          newList = JSON.parse(JSON.stringify(this.state.article));
          collectItem = newList[index-state.topArticle.length];
      }
      let id = collectItem.id;
      let url = collectItem.collect ? `/lg/uncollect_originId/${id}/json` : `/lg/collect/${id}/json`;
      let toastInfo = collectItem.collect ? '取消收藏成功' : '收藏成功';
      collectItem.collect = !collectItem.collect;
      // 发送ajax
      fetch.post(url).then((res) => {
        // res.errorCode,errorMsg,data
        if(res.errorCode != 0){
          console.log(res);
          this.toast.show(res.errorMsg)
        }else{
          // 更新对应的artcle数组
          if(index < this.state.topArticle.length){
            this.setState({
              topArticle: newList
            });
          }else{
            this.setState({
              article: newList
            });
          }
          this.toast.show(toastInfo);
        }
      }).catch( error => {
        console.log(error);
        this.toast.show('网络错误!');
      })
    }else{
      // 跳转到登录页
      this.toast.show('您还未登录,请先登录!',100,() => {
        this.props.navigation.navigate('login',{title:'登录'});
      })
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
        {/* 文章区域（推荐文章,文章列表） */}
        <FlatList articles={[...this.state.topArticle,...this.state.article]} loadmore={this.loadmore} reload={this.onRefresh} 
          pageCount={this.state.pageCount} pageNum={this.state.pageNum} navigation={ navigation } handleCollect={this.handleCollect}>
          {/* 首页轮播图 */}
          <View style={styles.swiper}>
            {/* {this.state.swiperNode} */}
            <Swiper style={styles.swiper}
              dot={<View style={[styles.swiper_dot,{ backgroundColor: this.props.theme.backgroundColor}]} />}
              activeDot={<View style={[styles.swiper_dot,{ backgroundColor: this.props.theme.themeColor}]} />}
              autoplay={true} >
              {this.state.banner.reverse().map(item => {
                return (
                  <View key={item.id} style={styles.swiper} >
                    <TouchableOpacity onPress={() => this.handleBanner(item)} >
                      <Image
                        resizeMode='stretch'
                        style={styles.swiper_image}
                        source={{uri: item.imagePath}}
                        defaultSource={require('../assets/img/normalBanner.gif')}
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </Swiper>
          </View>
        </FlatList>
        <Toast ref={(toast) => this.toast = toast}></Toast>
      </View>
    );
  }
};
const mapStateToProps = state => {
  return {
      theme: state.themeReducer.theme,
      score: state.baseReducer.score,
  }
}
export default connect(mapStateToProps)(Home)

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  swiper:{
    height:200,
    marginBottom:5
  },
  swiper_image:{
    width: win.width,
    height: 200,
  },
  swiper_dot:{
    marginBottom:4,
    marginTop:4,
    marginLeft:4,
    marginRight:4,
    width:8,
    height:8,
    borderRadius:6
  }
});