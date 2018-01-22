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
  Button
} from 'react-native';
import Favourite from './Favourite/Favourite';
import Home from './Home/Home';
import { TabNavigator } from 'react-navigation';


const TabMain = TabNavigator({
  Home: {
    screen: Home,
  },
  Favourite: {
    screen: Favourite,
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
//         <TabConfigure navigation={this.props.navigation}/>
//     ); 
//   }
// }

