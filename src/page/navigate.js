import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default class Navigate extends React.Component{
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
     <Text>navigate</Text>
    )
  }
};
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});