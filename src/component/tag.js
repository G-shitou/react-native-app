import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height:20,
            lineHeight:17,
            fontSize:12,
            color:'red',
            marginRight:5,
            paddingLeft:3,
            paddingRight:3,
            borderColor:'red',
            borderWidth:1,
            borderRadius:3,
        };
    }
    render() {
        return (
            <View style={Object.assign({},this.state,this.props.style)}>
                <Text style={{
                    color:this.props.style.color || this.state.color,
                    fontSize:this.props.style.fontSize || this.state.fontSize,
                    lineHeight:this.props.style.lineHeight || this.state.lineHeight
                }}>{this.props.content}</Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    
});