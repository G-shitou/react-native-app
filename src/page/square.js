import React from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../action/square';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import ArticleList from '../component/articleList';
import Toast from '../component/toast';

class Square extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  UNSAFE_componentWillMount(){
    this.getArticleList(0);
  }


  // 登录和未登录状态切换,或者切换用户之后需要刷新数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.score.userId !== nextProps.score.userId){
      console.log('用户变更,刷新数据');
      this.getArticleList(0);
    }
  }

  // 请求文章列表
  getArticleList = (num) => {
    const pageNum = typeof(num) === 'number' ? num : typeof(this.props.pageNum) === 'undefined' ? 0 : (this.props.pageNum + 1);
    this.props.dispatch(getArticle({pageNum})).then(res => {
      
    }).catch(err => {
      console.log(err);
    })
  }

  // 加载更多
  loadmore = () => {
    this.getArticleList();
  }

  // 点击收藏或取消收藏
  handleCollect = (index) => {
    // // 判断是否登录
    // if(this.props.score && this.props.score.userId){
    //   this.props.dispatch(collectArticle({index})).then(res => {
    //     this.toast.show(res.msg);
    //   }).catch(err => {
    //     this.toast.show(err.msg);
    //     console.log(err);
    //   })
    // }else{
    //   // 跳转到登录页
    //   this.toast.show('您还未登录,请先登录!',100,() => {
    //     this.props.navigation.navigate('login',{title:'登录'});
    //   })
    // }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
        {/* 文章区域（推荐文章,文章列表） */}
        <ArticleList articles={this.props.article} loadmore={this.loadmore} reload={() => this.getArticleList(0)} 
          pageCount={this.props.pageCount} pageNum={this.props.pageNum} navigation={ navigation } handleCollect={this.handleCollect}>
        </ArticleList>
        <Toast ref={(toast) => this.toast = toast}></Toast>
      </View>
    );
  }
};
const mapStateToProps = state => {
  return {
      article: state.squareReducer.article,
      pageNum: state.squareReducer.pageNum,
      pageCount: state.squareReducer.pageCount,
      theme: state.themeReducer.theme,
      score: state.baseReducer.score,
  }
}
export default connect(mapStateToProps)(Square)

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});