import React from 'react';
import List from '../component/commonList';
import {
  StyleSheet,
} from 'react-native';

export default class Square extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  UNSAFE_componentWillMount(){
    
  }

  render() {
    const { navigation } = this.props;
    return (
     <List navigation={ navigation } itemType='article' sourceType='square'></List> 
    )
  }
};
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});