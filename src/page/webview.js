import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    ProgressViewIOS,
    ProgressBarAndroid,
    View,
    Platform,
    Linking,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
// 引入字体图标组件
import Icon from 'react-native-vector-icons/AntDesign';
import ShareUtile from '../utils/ShareUtil';

// 屏幕
const win = Dimensions.get('window');
class Web extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:0
        };
    }

    UNSAFE_componentWillMount(){
        // 定义header 右上方icon
        // headerTitle: props => <Text numberOfLines={1}>{route.params.title}</Text>,
        this.props.navigation.setOptions({ headerRight: () => <View style={[styles.webviewHeader,{backgroundColor:this.props.theme.themeColor}]}>
            <Icon name='ie' style={[styles.headerRight,{fontSize:23}]} onPress={this.openUrl} />
            <Icon name='sharealt' style={styles.headerRight} onPress={this.onShare} />
        </View>,headerTitleStyle:{width:win.width-180} });
    }

    // 调用浏览器打开页面
    openUrl = () => {
        const {route} = this.props;
        Linking.canOpenURL(route.params.url).then(supported => {         
            if (!supported) {            
                console.warn('Can\'t handle url: ' + route.params.url);            
            } else {            
                return Linking.openURL(route.params.url);            
            }
        }).catch(err => console.error('An error occurred',route.params.url));   
    }
    
    // 分享文章
    onShare = () => {
        return;
        const { route } = this.props;
        ShareUtile.shareboard(route.params.title,'',route.params.url,'有一篇好文章,快来看看吧!',[0,1,2],(code,message) =>{
           console.log(code);
           console.log(message);
        });
    }

    render() {
        const { navigation,route } = this.props;
        const url = route.params.url;
        return (
            <View style={[styles.container,{backgroundColor:this.props.theme.backgroundColor}]}>
                {/* <View style={styles.titleBar}/> */}
                {this.state.progress !== 1 && (Platform.OS === 'IOS' ? <ProgressViewIOS
                    //这是进度条颜色
                    progressTintColor={this.props.theme.themeColor}
                    progress={this.state.progress}/> : <ProgressBarAndroid styleAttr="Horizontal" color={this.props.theme.themeColor} progress={this.state.progress}/>)}
                <WebView
                    source={{ uri: url }}
                    style={{ flex: 1,backgroundColor:this.props.theme.backgroundColor}}
                    //设置进度 progress值为0～1
                    onLoadProgress={({nativeEvent}) => this.setState(
                        {progress: nativeEvent.progress}
                    )}
                />
            </View>
        );
    }
};
const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme
    }
  }
export default connect(mapStateToProps)(Web)
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    webviewHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:20,
        // paddingRight:20,
    },
    headerRight: {
        color: '#fff',
        fontSize: 20,
        marginRight: 20,
    },
});
