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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonName:'登录',
            username:'',
            password:''
        };
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

    login = () => {
        if(this.state.buttonName === '登录'){
            this.props.dispatch(login({
                username:this.state.username,
                password:this.state.password
            })).then(res => {
                // 登录之后,会刷新个人信息和积分情况
                this.props.navigation.goBack()
            }).catch(err => {
                console.log(err);
            })
        }else{

        }
    }

    render() {
        const { navigation,route } = this.props;
        return (
            <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
                <View style={styles.content}>
                    <Text style={{color:this.props.theme.subColor,fontSize:16}}>请使用 WanAndroid 账号登陆</Text>
                    <View style={{borderBottomColor: this.props.theme.borderColor,borderBottomWidth: 1,marginTop:20}}>
                        <TextInput value={this.state.username} clearButtonMode='always' style={{color:this.props.theme.titleColor}} 
                            placeholder='请输入用户名' placeholderTextColor={this.props.theme.subColor}
                            onChangeText={text => this.changeUsername(text)} clearButtonMode='while-editing'/>
                    </View>
                    <View style={{borderBottomColor: this.props.theme.borderColor,borderBottomWidth: 1,marginTop:20}}>
                        <TextInput value={this.state.password} clearButtonMode='always'  style={{color:this.props.theme.titleColor}}
                            placeholder='请输入密码' placeholderTextColor={this.props.theme.subColor}
                            onChangeText={text => this.changePassword(text)} password={true} clearButtonMode='while-editing'/>
                    </View>
                    <View style={{marginTop:50}}>
                        <Button title={this.state.buttonName} color={this.props.theme.themeColor} onPress={this.login}></Button>
                    </View>
                    <View style={{marginTop:20}}>
                        <TouchableHighlight>
                            <Text style={{color:this.props.theme.subColor,fontSize:16,textAlign:'right'}}>还没有账号，注册一个？</Text>
                        </TouchableHighlight>
                    </View>
                </View>
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