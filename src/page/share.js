import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    Switch,
} from 'react-native';
import fetch from '../utils/fetch';
import Toast from '../component/toast';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            url:'',
            sendHome:false
        };
    }

    UNSAFE_componentWillMount(){
        // 定义header 右上方icon
        this.props.navigation.setOptions({ headerRight: () => <Text style={styles.headerRight} onPress={this.submit}>分享</Text> });
    }

    submit = () => {
        if(this.props.score && this.props.score.userId){
            if(!this.state.title || !this.state.url){
                this.toast.show('请将信息补充完整!');
            }else{
                // 发送ajax   接口暂不支持是否推送首页，不发此参数
                fetch.post('/lg/user_article/add/json',{
                    title:this.state.title,
                    link:this.state.url
                }).then((res) => {
                    // res.errorCode,errorMsg,data
                    if(res.errorCode != 0){
                        console.log(res);
                        this.toast.show(res.errorMsg)
                    }else{
                        this.toast.show('分享成功!');
                    }
                }).catch( error => {
                    console.log(error);
                    this.toast.show('网络错误!');
                })
            }
        }else{
            // 跳转到登录页
            this.toast.show('您还未登录,请先登录!',100,() => {
                this.props.navigation.navigate('login',{title:'登录'});
            })
        }
    }

    changeTitle = text => {
        this.setState({
            title:text
        })
    }

    changeUrl = text => {
        this.setState({
            url:text
        })
    }

    changeSwitch = value => {
        this.setState({
            sendHome:value
        })
    }

    render() {
        const { navigation,route } = this.props;
        return (
            <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
                <Text style={[styles.title,{color:this.props.theme.subColor}]}>文章标题</Text>
                <TextInput value={this.state.title} clearButtonMode='always' style={{color:this.props.theme.titleColor,height:60}}
                    placeholder='100字以内' placeholderTextColor={this.props.theme.subColor} multiline={true} textAlignVertical='top'
                    onChangeText={text => this.changeTitle(text)} clearButtonMode='while-editing' maxLength={100} />
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={[styles.title,{color:this.props.theme.subColor,fontSize:16,flex:1}]}>推送至首页 (消耗30积分)</Text>
                    <Switch value={this.state.sendHome} onValueChange={(value) => this.changeSwitch(value)}
                        trackColor={this.props.theme.themeColor} ios_backgroundColor={this.props.theme.themeColor}></Switch>
                </View>
                <Text style={[styles.title,{color:this.props.theme.subColor}]}>文章链接</Text>
                <TextInput value={this.state.url} clearButtonMode='always'  style={{color:this.props.theme.titleColor,flex:1}}
                    placeholder='例如：https://www.wanandroid.com' placeholderTextColor={this.props.theme.subColor} multiline = {true}
                    onChangeText={text => this.changeUrl(text)} clearButtonMode='while-editing' textAlignVertical='top'/>
                <Text style={{color:this.props.theme.subColor}}>1. 只要是任何好文都可以分享哈，并不一定要是原创！投递的文章会进入广场 tab;</Text>
                <Text style={{color:this.props.theme.subColor}}>2. CSDN，掘金，简书等官方博客站点会直接通过，不需要审核;</Text>
                <Text style={{color:this.props.theme.subColor}}>3. 其他个人站点会进入审核阶段，不要投递任何无效链接，测试的请尽快删除，否则可能会对你的账号产生一定影响;</Text>
                <Text style={{color:this.props.theme.subColor}}>4. 目前处于测试阶段，如果你发现500等错误，可以向我提交日志，让我们一起使网站变得更好。</Text>
                <Text style={{color:this.props.theme.subColor}}>5. 由于本站只有我一个人开发与维护，会尽力保证24小时内审核，当然有可能哪天太累，会延期，请保持佛系...</Text>
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
export default connect(mapStateToProps)(Login);
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    headerRight: {
        color: '#fff',
        fontSize: 16,
        marginRight: 20,
    },
    container:{
        flex:1,
        height:win.height,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding:20,
    },
    title:{
        fontSize:16,
        marginTop:10,
        marginBottom:10,
    },
});