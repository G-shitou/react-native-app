import React from 'react';
import { connect } from 'react-redux';
import { getBanner, getArticle, getTopArticle, collectArticle } from '../action/home/index';
import { login } from '../action/login'
import Swiper from 'react-native-swiper';
import CookieManager from '@react-native-community/cookies';
import {
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import ArticleList from '../component/articleList';
import Toast from '../component/toast';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
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
    this.props.dispatch(getTopArticle()).then(res => {
      
    }).catch(err => {
      console.log(err);
    })
  }

  // 请求文章列表
  getArticleList = (num) => {
    const pageNum = typeof(num) === 'number' ? num : typeof(this.props.pageNum) === 'undefined' ? 0 : (this.props.pageNum + 1);
    this.props.dispatch(getArticle({pageNum})).then(res => {
      
    }).catch(err => {
      console.log(err);
    })
  }

  // 请求banner数据
  getBannerDate = () => {
    this.props.dispatch(getBanner()).then(res => {
      
    }).catch(err => {
      console.log(err);
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
      this.props.dispatch(collectArticle({index})).then(res => {
        this.toast.show(res.msg);
      }).catch(err => {
        this.toast.show(err.msg);
        console.log(err);
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
        <ArticleList articles={[...this.props.topArticle,...this.props.article]} loadmore={this.loadmore} reload={this.onRefresh} 
          pageCount={this.props.pageCount} pageNum={this.props.pageNum} navigation={ navigation } handleCollect={this.handleCollect}>
          {/* 首页轮播图 */}
          <View style={styles.swiper}>
            {/* {this.state.swiperNode} */}
            <Swiper style={styles.swiper}
              dot={<View style={[styles.swiper_dot,{ backgroundColor: this.props.theme.backgroundColor}]} />}
              activeDot={<View style={[styles.swiper_dot,{ backgroundColor: this.props.theme.themeColor}]} />}
              autoplay={true} >
              {this.props.banner.reverse().map(item => {
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
        </ArticleList>
        <Toast ref={(toast) => this.toast = toast}></Toast>
      </View>
    );
  }
};
const mapStateToProps = state => {
  return {
      banner: state.homeReducer.banner,
      article: state.homeReducer.article,
      topArticle: state.homeReducer.topArticle,
      pageNum: state.homeReducer.pageNum,
      pageCount: state.homeReducer.pageCount,
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