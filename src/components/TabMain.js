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
import StackConfigure from './Favourite/Favourite';
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
    screen: StackConfigure,
    navigationOptions: {
      tabBarLabel: 'Favourites',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/favourite.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/setting.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    }
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