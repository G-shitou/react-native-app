import React from 'react';
import { connect } from 'react-redux';
import { getBanner, getArticle, getTopArticle } from '../action/home/index';
import Swiper from 'react-native-swiper';
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

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  UNSAFE_componentWillMount(){
    this.onRefresh();
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {/* 文章区域（推荐文章,文章列表） */}
        <ArticleList articles={[...this.props.topArticle,...this.props.article]} loadmore={this.loadmore} reload={this.onRefresh} 
          pageCount={this.props.pageCount} pageNum={this.props.pageNum} navigation={ navigation } >
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
      theme: state.themeReducer.theme
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