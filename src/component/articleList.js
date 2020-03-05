import React from 'react';
import { connect } from 'react-redux';
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import Tag from './tag';

class ArticleList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            loadmore:true
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

    render() {
        return (
            <View style={styles.container}>
                {this.props.articles.length === 0 ? <ActivityIndicator style={styles.loading} size="large" color={this.props.theme.loadingColor}/> : (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                               refreshing={this.state.refreshing}
                               onRefresh={this.onRefresh}
                               colors={[this.props.theme.loadingColor]}
                           />}
                        onEndReachedThreshold={0.1}
                        onEndReached={this.loadmore}
                        ListHeaderComponent={this.props.children}
                        ListFooterComponent={
                            <View style={styles.loading}>
                                <ActivityIndicator size="small" color={this.props.theme.loadingColor}/>
                                <Text style={[styles.loading_text,{color:this.props.theme.subColor}]}>{this.props.pageNum === this.props.pageCount ? '没有更多数据了' : '正在加载更多数据'}</Text>
                            </View>
                        }
                        data={this.props.articles}
                        renderItem={({item}) => 
                            <ListItem params={item} onHandle={this.handleArticle} theme={this.props.theme} />
                        }>
                    </FlatList>
                )}
            </View>
        );
    }
};

class ListItem extends React.PureComponent {
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
                        {item.tags.length !== 0 && item.tags.map(item => {
                            return (<Tag content={item.name} style={styles.tag_type} key={item.name}></Tag>)
                        })}
                        <Text style={[styles.text_color_gray,{color:this.props.theme.subColor}]}>{item.author || item.shareUser}</Text>
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
                        {item.chapterName ? `${item.superChapterName} / ${item.chapterName}` : item.superChapterName}
                    </Text>
                    <Text style={[styles.article_fixed,{color:this.props.theme.subColor}]}>收藏</Text>
                </View>
            </View>
        </TouchableHighlight>
      );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme,
    }
}
export default connect(mapStateToProps)(ArticleList)

const styles = StyleSheet.create({
    container:{
        // flex:1
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
        borderBottomWidth:1,
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
    }
});