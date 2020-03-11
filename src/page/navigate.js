import React from 'react';
import fetch from '../utils/fetch';
import ScrollView from '../component/scrollView'

export default class System extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }
  }

  UNSAFE_componentWillMount(){
    this.getData();
  }

  // 请求体系数据
  getData = () => {
    // 发送ajax
    fetch.get('/navi/json').then((res) => {
      // res.errorCode,errorMsg,data
      if(res.errorCode != 0){
        console.log(res);
      }else{
        this.setState({
            data: res.data
        });
      }
    }).catch( error => {
      console.log(error);
    })
  }

  render() {
    return (
      <ScrollView data={this.state.data} navigation={this.props.navigation} getData={this.getData} type="navigate"></ScrollView>
    );
  }
};