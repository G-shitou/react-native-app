import React from 'react';
import { StyleSheet, View, Text, Linking, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { themeColor } from '../action/login/index';
import AsyncStorage from '@react-native-community/async-storage';

class Setting extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      colors:['#eb2100', '#D0570E', '#D0A00E', '#0096F3', '#1FB246', '#6355F1', '#FF9080', '#00BFB7', '#765005', '#0B4C50'],
      showColor:false,
    }
  }

  UNSAFE_componentWillMount(){
    
  }

  selectColor = () => {
    this.setState({
        showColor: !this.state.showColor
    })
  }

  changeColor = color => {
    AsyncStorage.setItem('themeColor',color).then(res => {
        this.props.dispatch(themeColor(color));
    })
  }

  // 调用浏览器打开页面
  openUrl = url => {
      console.log(url)
    Linking.canOpenURL(url).then(supported => {         
        if (!supported) {            
            console.warn('Can\'t handle url: ' + url);            
        } else {            
            return Linking.openURL(url);            
        }
    }).catch(err => console.error('An error occurred',url));   
  }

  render() {
    const { route, navigation } = this.props;
    return (
        <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
            <TouchableHighlight onPress={this.selectColor}>
                <View style={[styles.content,{backgroundColor:this.props.theme.backgroundColor}]}>
                    <Icon name='appstore-o' size={18} color={this.props.theme.themeColor}/>
                    <Text style={{flex:1,color:this.props.theme.titleColor,fontSize:16,marginLeft:20}}>主题颜色</Text>
                    <Icon name={this.state.showColor ? 'up' : 'down'} size={18} color={this.props.theme.titleColor}/>
                </View>
            </TouchableHighlight>
            { this.state.showColor && <View style={[styles.content,{flexWrap:'wrap'}]}>
                {this.state.colors.map((item,index) => {
                    return <TouchableHighlight key={index} onPress={() => {this.changeColor(item)}}>
                        <View style={{backgroundColor:item,height:40,width:40,margin:5}}></View>
                    </TouchableHighlight>
                })}
             </View>
            }
            <TouchableHighlight onPress={() => this.openUrl('https://github.com/G-shitou/react-native-app/issues')}>
                <View style={[styles.content,{backgroundColor:this.props.theme.backgroundColor}]}>
                    <Icon name='select1' size={18} color={this.props.theme.themeColor}/>
                    <Text style={{flex:1,color:this.props.theme.titleColor,fontSize:16,marginLeft:20}}>意见反馈</Text>
                    <Icon name='right' size={18} color={this.props.theme.titleColor}/>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.openUrl('https://github.com/G-shitou/react-native-app')} >
                <View style={[styles.content,{backgroundColor:this.props.theme.backgroundColor}]} >
                    <Icon name='link' size={18} color={this.props.theme.themeColor}/>
                    <Text style={{flex:1,color:this.props.theme.titleColor,fontSize:16,marginLeft:20}}>项目地址</Text>
                    <Icon name='right' size={18} color={this.props.theme.titleColor}/>
                </View>
            </TouchableHighlight>
            
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
export default connect(mapStateToProps)(Setting);

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10,
    },
    content:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:10,
      paddingBottom:10
    },
})