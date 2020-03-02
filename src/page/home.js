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
        <Button title={'go to page2'} onPress={() => {
          console.log(1)
        }}></Button>
        <Button title={'跳转到广场'} onPress={() => {
          navigation.navigate('广场', {
            name: 'Page3',
            mode: ''
          })
        }}></Button>
      </SafeAreaView>
    );
  }
};
// export default class Page1 extends React.Component{
//   render() {
//     const {navigation} = this.props;
//     return (
//         <SafeAreaView>
//           <Text>page1</Text>
//           <Button title={'go to page2'} onPress={()=>{
//               navigation.navigate('Page2',{
//                 name:'page2'
//               })
//             }}></Button>
//           <Button title={'go to page3'} onPress={()=>{
//             navigation.navigate('Page3',{
//               name:'page3',
//               mode:''
//             })
//           }}></Button>
//         </SafeAreaView>
//     );
//   }
// };

const styles = StyleSheet.create({

});
