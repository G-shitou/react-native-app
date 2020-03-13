import React from 'react';
import fetch from '../utils/fetch';
import FlatList from '../component/flatList';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class Score extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      pageCount:undefined,
      pageNum:undefined
    }
  }

  UNSAFE_componentWillMount(){
    this.getData();
  }

  // 请求积分获取数据
  getData = (num) => {
    const { navigation,route } = this.props;
    const pageNum = typeof(num) === 'number' ? num : typeof(this.state.pageNum) === 'undefined' ? 0 : (this.state.pageNum + 1);
    // 这里需要添加判断是否时是后一页
    if(this.state.pageCount === pageNum){
      return;
    }
    // 发送ajax
    fetch.get(`/lg/coin/list/${pageNum}/json`).then((res) => {
      // res.errorCode,errorMsg,data
      if(res.errorCode != 0){
        console.log(res);
      }else{
        this.setState({
            pageCount:res.data.pageCount,
            data: res.data.datas,
            pageNum
        });
      }
    }).catch( error => {
      console.log(error);
    })
  }

  render() {
    const { route, navigation } = this.props;
    return (
        <FlatList articles={this.state.data} loadmore={this.getData} reload={() => this.getData(0)} itemType='score'
            pageCount={this.state.pageCount} pageNum={this.state.pageNum} navigation={ navigation }>
            <View style={{backgroundColor:this.props.theme.themeColor,height:150,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:50}}>{this.props.score.coinCount}</Text>
            </View>
        </FlatList>
    );
  }
};

const mapStateToProps = state => {
    return {
        theme: state.themeReducer.theme,
        score: state.baseReducer.score,
    }
}
export default connect(mapStateToProps)(Score)