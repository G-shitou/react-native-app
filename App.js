import * as React from 'react';
// 引入react-native-gesture-handler
import 'react-native-gesture-handler';
// 引入 navigationContainer
import { NavigationContainer } from '@react-navigation/native';
// 引入最外层navigator
import Navigator from './src/navigation/drawer';
const App = () => {
  return (
    <NavigationContainer>
      {Navigator()}
    </NavigationContainer>
  );
};

export default App;
