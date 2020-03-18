import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Linking, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

const win = Dimensions.get('window');
class Advertisement extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        time: 16,
    }
  }

  UNSAFE_componentWillMount(){
    // 清除启动屏幕
    this.timerout = setTimeout(() => {
      SplashScreen.hide();
      clearTimeout(this.timerout);
    },1000);
    const { route, navigation} = this.props;
    this.timer = setInterval( () => {
        let time = this.state.time - 1;
        console.log(time)
        if(time > 0){
            this.setState({
                time
            })
        } else {
            clearInterval(this.timer);
            // 倒计时结束，跳转到首页
            navigation.replace('home');
        }
    },1000);
  }

  // 跳过
  skip = () => {
      this.timer && clearInterval(this.timer);
      this.props.navigation.replace('home');
  }

  // 点击广告图片，跳转到地址
  handleAd = () => {
    const url = 'https://baike.baidu.com/item/%E7%A4%BE%E4%BC%9A%E4%B8%BB%E4%B9%89%E6%A0%B8%E5%BF%83%E4%BB%B7%E5%80%BC%E8%A7%82/3271832?fr=aladdin';
    Linking.canOpenURL(url).then(supported => {         
        if (!supported) {            
            console.warn('Can\'t handle url: ' + url);            
        } else {            
            return Linking.openURL(url);            
        }
    }).catch(err => console.error('An error occurred',url)); 
  }

  render() {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={this.handleAd} >
                <Image
                    resizeMode='stretch'
                    style={{width:win.width,height:win.height}}
                    source={require('../assets/img/advertisement.jpg')}
                />
            </TouchableHighlight>
            <View style={styles.content}>
                <Text style={styles.text} onPress = {this.skip}>{`${this.state.time} 跳过`}</Text>
            </View>
        </View>
    );
  }
};

const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme,
    }
}
export default connect(mapStateToProps)(Advertisement);
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    content:{
        position:'absolute',
        right:30,
        top:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    text:{
        fontSize:16,
        color:'#fff',
        padding:5,
        backgroundColor:'rgba(0,0,0,0.6)',
        borderRadius:10,
    },
})