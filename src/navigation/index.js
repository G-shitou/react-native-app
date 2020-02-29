import { createStackNavigator } from 'react-navigation';
import Page1 from '../page/page1';
import Page2 from '../page/page2';
import Page3 from '../page/page3';
import Page4 from '../page/page4';
import { Button } from 'react-native';
const AppStackNavigator = createStackNavigator({
    Page1:{
        screen:Page1,
        navigationOptions: {
            title: '静态页面名：页面1'
        }
    },
    Page2:{
        screen:Page2,
        navigationOptions: ({navigation}) => ({
            title: `动态页面名：${navigation.state.params.name}`
        })
    },
    Page3:{
        screen:Page3,
        navigationOptions: (props) => {
            const { navigation } = props;
            const { state, setParams } = navigation;
            const { params } = state;
            return {
                title: params.title ? params.title : 'page3',
                headerRight: (
                    <Button title={ params.mode === 'edit' ? '保存' : '编辑' }
                        onPress={ () => setParams({mode:params.mode === 'edit' ? '' : 'edit'})}></Button>
                )
            }
        }
    },
    Page4:{
        screen:Page4
    }
});

export default AppStackNavigator;