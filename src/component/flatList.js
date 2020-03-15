import React from 'react';
import { connect } from 'react-redux';
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ActionButton from 'react-native-action-button';
import Tag from './tag';

// 屏幕
const win = Dimensions.get('window');
class NewFlatList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            loadmore:true,
            isShowToTop:false
        };
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
        this.props.reload && this.props.reload();
    }

    // 下拉加载更多
    loadmore = () => {
        this.props.loadmore && this.props.loadmore();
    }

    // 点击文章跳转
    handleArticle = (item) => {
        const { navigation } = this.props;
        navigation.navigate('webview',{
            title:item.title,
            url:item.link
          });
    }

    // 点击收藏或取消收藏
    handleCollect = index => {
        this.props.handleCollect(index);
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
            <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
                {this.props.articles.length === 0 ? <ActivityIndicator style={[styles.loading,{marginTop:win.height/2-100}]} size="large" color={this.props.theme.themeColor}/> : (
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        refreshControl={
                            <RefreshControl
                               refreshing={this.state.refreshing}
                               onRefresh={this.onRefresh}
                               colors={[this.props.theme.themeColor || '#2D92FF']}
                               progressBackgroundColor={this.props.theme.backgroundColor}
                           />}
                        onEndReachedThreshold={0.1}
                        onEndReached={this.loadmore}
                        ListHeaderComponent={this.props.children}
                        ListFooterComponent={
                            <View style={styles.loading}>
                                {(typeof(this.props.pageCount) === 'undefined' || this.props.pageNum < this.props.pageCount -1 ) && <ActivityIndicator size="small" color={this.props.theme.themeColor}/>}
                                <Text style={[styles.loading_text,{color:this.props.theme.subColor}]}>
                                    {typeof(this.props.pageCount) === 'undefined' ? '正在加载更多数据' : this.props.pageNum < this.props.pageCount - 1 ? '正在加载更多数据' : '已经到底啦!'}
                                </Text>
                            </View>
                        }
                        onScroll={this.onScroll}
                        data={this.props.articles}
                        renderItem={({item,index}) => {
                            // 有重复文章，key需要特殊处理
                            if(this.props.itemType === 'project'){
                                return <ProjectItem params={item} key={item.title + index} onHandle={this.handleArticle} theme={this.props.theme} handleCollect={() => this.handleCollect(index)}/>
                            }else if(this.props.itemType === 'score'){
                                return <ScoreItem params={item} key={item.id} theme={this.props.theme}></ScoreItem>
                            } else {
                                return <ArticleItem params={item} key={item.title + index} onHandle={this.handleArticle} theme={this.props.theme} handleCollect={() => this.handleCollect(index)}/>
                            }
                        }}>
                    </FlatList>
                )}
                {this.state.isShowToTop && <ActionButton
                    size={50}
                    buttonColor={this.props.theme.themeColor}
                    onPress={() => {
                        this._flatList.scrollToOffset({animated: true, viewPosition: 0, index: 0}); //跳转到顶部
                        // this._flatList.scrollToEnd();  //跳转到底部
                    }}
                    renderIcon={() => (
                        <Icon style={styles.goUp} name="arrowup" size={24} color='#fff'/>
                    )}
                />}
            </View>
        );
    }
};


// 文章list item
class ArticleItem extends React.PureComponent {
    render() {
      const item = this.props.params;
      return (
        <TouchableHighlight
            onPress={() => this.props.onHandle(item)} >
            <View style={[styles.article,{borderBottomColor: this.props.theme.borderColor,backgroundColor:this.props.theme.backgroundColor}]}>
                {/* tap,auther,time */}
                <View style={styles.article_top_bottom}>
                    <View style={[styles.article_flex,{color:this.props.theme.subColor}]}>
                        {item.type == 1 && <Tag content='置顶' style={styles.tag_new}></Tag>}
                        {item.fresh && <Tag content='新' style={styles.tag_new}></Tag>}
                        {item.tags && item.tags.length !== 0 && item.tags.map(item => {
                            return (<Tag content={item.name} style={styles.tag_type} key={item.name}></Tag>)
                        })}
                        <Text style={[styles.text_color_gray,{color:this.props.theme.subColor}]}>{item.author || item.shareUser || '未知'}</Text>
                    </View>
                    <View style={[styles.article_fixed,{color:this.props.theme.subColor}]}>
                        <Text style={[styles.article_fixed,{color:this.props.theme.subColor}]}>{ item.niceDate }</Text>
                    </View>
                </View>
                {/* title */}
                <View style={styles.middle}>
                    <Text numberOfLines={2} style={[styles.title,{color:this.props.theme.titleColor}]}>{ item.title }</Text>
                </View>
                {/* type */}
                <View style={styles.article_top_bottom}>
                    <Text style={[styles.article_flex,{color:this.props.theme.subColor}]}>
                        { item.superChapterName ? (item.chapterName ? `${item.superChapterName} / ${item.chapterName}` : 
                            item.superChapterName) : item.chapterName }
                    </Text>
                    <Icon name='heart' size={16} color={item.collect ? '#FF6262': this.props.theme.subColor} onPress={this.props.handleCollect}/>
                </View>
            </View>
        </TouchableHighlight>
      );
    }
}

// 项目list item
class ProjectItem extends React.PureComponent {
    render(){
        const item = this.props.params;
        return (
            <TouchableHighlight onPress={() => this.props.onHandle(item)} >
                <View style={[styles.project,{borderBottomColor: this.props.theme.borderColor,backgroundColor:this.props.theme.backgroundColor}]}>
                    <Image style={styles.project_img} source={{uri: item.envelopePic}} loadingIndicatorSource={require('../assets/img/loading.jpg')}></Image>
                    <View style={styles.project_content}>
                        <Text numberOfLines={2} style={[styles.project_title,{color:this.props.theme.titleColor}]}>{item.title}</Text>
                        <Text numberOfLines={8} style={[styles.project_desc,{color:this.props.theme.subColor}]}>{item.desc}</Text>
                        <View style={styles.project_sub}>
                            <Text style={{flex:1,textAlign:'left',color:this.props.theme.subColor}}>{item.author + '  ' + item.niceDate}</Text>
                            <Icon name='heart' size={16} color={item.collect ? '#FF6262': this.props.theme.subColor} onPress={this.props.handleCollect}/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight> 
        )
    }
}

// 签到积分list item
class ScoreItem extends React.PureComponent {
    render(){
        const item = this.props.params;
        return (
            <View style={[styles.score,{borderBottomColor: this.props.theme.borderColor,backgroundColor:this.props.theme.backgroundColor}]}>
                <View style={{height:40,flex:1}}>
                    <Text style={{color:this.props.theme.titleColor,fontSize:17}}>{item.reason}</Text>
                    <Text style={{color:this.props.theme.subColor,fontSize:14}} numberOfLines={1}>{item.desc}</Text>
                </View>
                <Text style={{width:40,color:this.props.theme.themeColor,fontSize:17}}>{`+ ${item.coinCount}`}</Text>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme,
    }
}
export default connect(mapStateToProps)(NewFlatList)

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    article:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'flex-start',
        height:110,
        // backgroundColor:'#fff',
        paddingLeft:18,
        paddingRight:18,
        borderTopWidth:0,
        borderBottomWidth:0.5,
        // borderBottomColor:'#D9D9D9'
    },
    article_middle:{
        flex:1
    },
    article_top_bottom:{
        height:25,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    article_flex:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        // color: 'gray',
        fontSize:14,
    },
    article_fixed:{
        width:200,
        textAlign:'right',
        // color: 'gray',
        fontSize:14,
    },
    title:{
        textAlign:'left',
        fontSize:16,
    },
    text_color_gray:{
        // color: 'gray',
        fontSize:14,
    },
    tag_new:{
       color:'#FF6262',
       borderColor:'#FF6262',
       marginRight:8,
    },
    tag_type:{
        color:'#23CF8A',
        borderColor:'#23CF8A',
        marginRight:8,
    },
    loading:{
        marginTop:5,
        marginBottom:5,
    },
    loading_text:{
        // color: 'gray',
        fontSize:14,
        textAlign:'center'
    },
    project:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:220,
        padding:10,
        // paddingRight:18,
        borderTopWidth:0,
        borderBottomWidth:0.5,
    },
    project_img:{
        height:200,
        width:130,
    },
    project_content:{
        flex:1,
        height:200,
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingLeft:10,
        paddingRight:10,
    },
    project_title:{
        fontSize:16,
    },
    project_desc:{
        fontSize:14,
    },
    project_sub:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    score:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:15,
    }
});