/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Favourite from './Favourite/Favourite';
import Home from './Home/Home';
import { TabNavigator } from 'react-navigation';


const TabConfigure = TabNavigator({
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

export default class TabMain extends Component {
  render() {
    return (
      // <View style={styles.container}>
      <TabConfigure />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
