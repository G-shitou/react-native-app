import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    Button,
    TouchableHighlight,
} from 'react-native';
import { login, register } from '../action/login';
import Toast from '../component/toast';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            buttonName:'登录',
            username:'石头来了',
            password:'123456',
            confirmPassword:'',
        };
    }

    UNSAFE_componentWillMount(){
        // 定义header 右上方icon
        this.props.navigation.setOptions({ headerRight: () => <Text style={styles.headerRight} onPress={this.submit}>分享</Text> });
    }

    submit = () => {

    }

    changeUsername = text => {
        this.setState({
            username:text
        })
    }

    changePassword = text => {
        this.setState({
            password:text
        })
    }

    changeConfirmpassword = text => {
        this.setState({
            confirmPassword:text
        })
    }

    register = () => {
        this.props.navigation.setOptions({
            title:'注册'
        });
        this.setState({
            isLogin:false,
            buttonName:'注册',
            username:'',
            password:'',
        })
    }

    login = () => {
        if(this.state.buttonName === '登录'){
            this.props.dispatch(login({
                username:this.state.username,
                password:this.state.password
            })).then(res => {
                this.toast.show('登陆成功',300,() => {
                    // 登录之后,会刷新个人信息和积分情况
                    this.props.navigation.goBack()
                })
            }).catch(err => {
                console.log(err);
                this.toast.show(err.msg || '未知错误!');
            })
        }else{
            this.props.dispatch(register({
                username:this.state.username,
                password:this.state.password,
                repassword:this.state.confirmPassword
            })).then(res => {
                this.toast.show('注册并登录成功',300,() => {
                    // 登录之后,会刷新个人信息和积分情况
                    this.props.navigation.goBack()
                })
            }).catch(err => {
                console.log(err);
                this.toast.show(err.msg || '未知错误!');
            })
        }
    }

    render() {
        const { navigation,route } = this.props;
        return (
            <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
                <View style={styles.content}>
                    <Text style={{color:this.props.theme.subColor,fontSize:16}}>文章标题</Text>
                    <View style={{borderBottomColor: this.props.theme.borderColor,borderBottomWidth: 1,marginTop:20}}>
                        <TextInput value={this.state.username} clearButtonMode='always' style={{color:this.props.theme.titleColor}} 
                            placeholder='请输入用户名' placeholderTextColor={this.props.theme.subColor}
                            onChangeText={text => this.changeUsername(text)} clearButtonMode='while-editing'/>
                    </View>
                    <View style={{borderBottomColor: this.props.theme.borderColor,borderBottomWidth: 1,marginTop:20}}>
                        <TextInput value={this.state.password} clearButtonMode='always'  style={{color:this.props.theme.titleColor}}
                            placeholder='请输入密码' placeholderTextColor={this.props.theme.subColor}
                            onChangeText={text => this.changePassword(text)} secureTextEntry={true} clearButtonMode='while-editing'/>
                    </View>
                </View>
                <Toast ref={(toast) => this.toast = toast}></Toast>
            </View>
        );
    }
};
const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme
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
        height:win.height,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    content:{
        width:win.width,
        marginTop:100,
        paddingLeft:40,
        paddingRight:40,
    }
});