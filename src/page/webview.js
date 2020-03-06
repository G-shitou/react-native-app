import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    ProgressViewIOS,
    ProgressBarAndroid,
    View,
    Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

class Web extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:0
        };
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
    }
});
