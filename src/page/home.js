import React from 'react';
import { connect } from 'react-redux';
import { getBanner, getArticle } from '../action/home/index';
import Swiper from 'react-native-swiper';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  UNSAFE_componentWillMount(){
    this.getBannerDate();
    // dispatch(getArticle({pageNum:this.props.pageNum})).then(res => {
    //   console.log(1)
    // }).catch(err => {})
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    // banner数据刷新,更新banner轮播
    if(this.props.banner.toString() !== nextProps.banner.toString()){
      let swiperNode = this.initSwiper(nextProps.banner);
      this.setState({
        swiperNode
      })
    }
  }

  // 请求banner数据
  getBannerDate = () => {
    this.props.dispatch(getBanner()).then(res => {
      // 初始化时生成banner轮播node
      let swiperNode = this.initSwiper(this.props.banner);
      this.setState({
        swiperNode
      })
    }).catch(err => {
      console.log(err);
    })
  }

  // 生成轮播render
  initSwiper = (data) => {
    return (
      <Swiper style={styles.swiper}
        autoplay={true} >
        {data.reverse().map(item => {
          return (
            <View key={item.id} style={styles.swiper} >
              <TouchableOpacity onPress={() => this.handleBanner(item)} >
                <Image
                  // key={item.id}
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
    )
  }

  // 点击banner跳转
  handleBanner = (item) => {
    // console.log(item);
    const { navigation } = this.props;
    navigation.navigate('webview',{
      title:item.title,
      url:item.url
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex:1}}
        showsButtons={true}
        autoplay={true}
        >
        {/* 首页轮播图 */}
        <View style={styles.swiper}>
          {this.state.swiperNode}
        </View>
        {/* 文章区域（推荐文章,文章列表） */}
      </View>
    );
  }
};
const mapStateToProps = state => {
  return {
      banner: state.homeReducer.banner,
      article: state.homeReducer.article,
      pageNum: state.homeReducer.pageNum
  }
}
export default connect(mapStateToProps)(Home)

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  swiper:{
    height:200,
  },
  swiper_image:{
    width: win.width,
    height: 200,
  }
});