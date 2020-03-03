import React from 'react';
import {
    StyleSheet,
    ProgressViewIOS,
    ProgressBarAndroid,
    View,
    Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class Web extends React.Component {
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
            <View style={styles.container}>
                {/* <View style={styles.titleBar}/> */}
                {this.state.progress !== 1 && (Platform.OS === 'IOS' ? <ProgressViewIOS
                    //这是进度条颜色
                    progressTintColor="#2D92FF"
                    progress={this.state.progress}/> : <ProgressBarAndroid color="#2D92FF" progress={this.state.progress}/>)}
                <WebView
                    source={{ uri: url }}
                    style={{ flex: 1 }}
                    //设置进度 progress值为0～1
                    onLoadProgress={({nativeEvent}) => this.setState(
                        {progress: nativeEvent.progress}
                    )}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
