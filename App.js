import * as React from 'react';
import { Provider } from 'react-redux';
// 引入react-native-gesture-handler
import 'react-native-gesture-handler';
// 引入 navigationContainer
import { NavigationContainer } from '@react-navigation/native';
// 引入最外层navigator
import Navigator from './src/navigation/drawer';
import Store from './src/store'

const store = Store();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {Navigator()}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
