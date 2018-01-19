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
  Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Popular from './Popular';

const StackConfigure=StackNavigator({
  Popular:{
    screen:Popular,
  }
},{
  headerMode:'none'
})


export default class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Movies',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/home.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
     <StackConfigure/>
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
  icon: {
    width: 26,
    height: 26,
  },
});
