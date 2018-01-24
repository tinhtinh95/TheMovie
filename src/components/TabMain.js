/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button, Image, Dimensions
} from 'react-native';
import Favourite from './Favourite/Favourite';
import Home from './Home/Home';
import Setting from './Settings/Settings';
import About from './About/About';
import { TabNavigator } from 'react-navigation';

const { width, height } = Dimensions.get('window');

const TabMain = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Movies',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/home.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    }
  },
  Favourite: {
    screen: Favourite,
  },
  Setting: {
    screen: Setting,
  },
  About: {
    screen: About,
  }
},
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        backgroundColor: 'rgb(90,100,174)',
      },
    },
  }
)
export default TabMain;
// export default class TabMain extends Component {
//   render() {
//     return (
//       // <View>
// <TabConfigure />
// // {/* <Button title="ahihi" onPress={()=>this.props.navigation.navigate('DrawerOpen')}></Button> */}
//       // </View>
        
//     ); 
//   }
// }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(90,100,174)',
  },
  icon: {
    margin: 10,
    width: 26,
    height: 26,
    tintColor: 'white'
  },
});