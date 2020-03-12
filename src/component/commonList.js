import React from 'react';
import { connect } from 'react-redux';
import fetch from '../utils/fetch';
import {
  StyleSheet,
  View,
} from 'react-native';
import FlatList from './flatList';
import Toast from './toast';

class CommonList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      article:[],
      pageNum:undefined,
      pageCount:undefined
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
    const { navigation,route } = this.props;
    const pageNum = typeof(num) === 'number' ? num : typeof(this.state.pageNum) === 'undefined' ? 0 : (this.state.pageNum + 1);
    // 这里需要添加判断是否时是后一页
    if(this.state.pageCount === pageNum){
      return;
    }
    // 用页码构造地址
    const url = route.params.sourceType === 'square' ? `/user_article/list/${pageNum}/json` : (
      route.params.sourceType === 'wechat' ? `/wxarticle/list/${route.params.id}/${pageNum}/json` : (
      route.params.sourceType === 'project' ? `/project/list/${pageNum}/json?cid=${route.params.id}` : (
      route.params.sourceType === 'search' ? `/article/query/${pageNum}/json` : `/article/list/${pageNum}/json?cid=${route.params.id}`
    )));
    // 搜索需要用post请求
    if(route.params.sourceType === 'search'){
      fetch.post(url,{k:route.params.title}).then((res) => {
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
        this.toast.show('网络错误!');
      })
    }else{
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
        this.toast.show('网络错误!');
      })
    }
  }

  // 加载更多
  loadmore = () => {
    this.getArticleList();
  }

  // 点击收藏或取消收藏
  handleCollect = (index) => {
      // 判断是否登录
    if(this.props.score && this.props.score.userId){
        let newList = JSON.parse(JSON.stringify(this.state.article)),
            collectItem = newList[index],
            id = collectItem.id;
            url = collectItem.collect ? `/lg/uncollect_originId/${id}/json` : `/lg/collect/${id}/json`;
            toastInfo = collectItem.collect ? '取消收藏成功' : '收藏成功';
            collectItem.collect = !collectItem.collect;
        // 发送ajax
        fetch.post(url).then((res) => {
          // res.errorCode,errorMsg,data
          if(res.errorCode != 0){
            console.log(res);
            this.toast.show(res.errorMsg)
          }else{
            // 更新artcle数组
            this.setState({
                article: newList
            });
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
    const { navigation,route } = this.props;
    return (
      <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
        {/* 文章区域（推荐文章,文章列表） */}
        <FlatList articles={this.state.article} loadmore={this.loadmore} reload={() => this.getArticleList(0)} itemType={route.params.itemType}
          pageCount={this.state.pageCount} pageNum={this.state.pageNum} navigation={ navigation } handleCollect={this.handleCollect}>
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
export default connect(mapStateToProps)(CommonList)
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});