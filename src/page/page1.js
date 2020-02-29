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

export default class Page1 extends React.Component{
  render() {
    const {navigation} = this.props;
    return (
        <SafeAreaView>
          <Text>page1</Text>
          <Button title={'go to page2'} onPress={()=>{
              navigation.navigate('Page2',{
                name:'page2'
              })
            }}></Button>
          <Button title={'go to page3'} onPress={()=>{
            navigation.navigate('Page3',{
              name:'page3',
              mode:''
            })
          }}></Button>
        </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  
});
