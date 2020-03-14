import React from 'react';
import { connect } from 'react-redux';
import fetch from '../utils/fetch';
import { login, theme, themeColor } from '../action/login'
import Swiper from 'react-native-swiper';
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FlatList from '../component/flatList';
import Toast from '../component/toast';

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
    // 判断是否有cookie，如果有自动登录
    CookieManager.get('cookie').then((res) => {
      if(JSON.stringify(res) != '{}'){
        this.props.dispatch(login()).then(res=>{

        }).catch(err => {
          console.log(err);
        })
      }
      this.onRefresh();
    });
    // 读取本地储存的皮肤信息,初始化themeState
    const _theme = config.theme;
    let themeType;
    AsyncStorage.getItem('themeType').then(res => {
        themeType = res || 'day';
        // theme[themeType]
        this.props.dispatch(theme(_theme[themeType]))
    });
    // 主题颜色
    AsyncStorage.getItem('themeColor').then(res => {
      let color = res || '#2D92FF';
      this.props.dispatch(themeColor(color));
    })
  }


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