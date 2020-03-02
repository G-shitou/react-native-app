/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default class Home extends React.Component{
  UNSAFE_componentWillMount(){
    this.props.navigation.setParams({title:'首页'})
  }
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView>
        <Text>home</Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({

});
