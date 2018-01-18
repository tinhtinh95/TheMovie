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
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import Albums from './Albums';
import EditProfile from './EditProfile';
import {StackNavigator} from 'react-navigation';

const StackConfigure=StackNavigator({
    EditProfile: {
        screen: EditProfile
    },
    Albums:{
        screen:Albums
    }
},{
    headerMode:'none'
})

export default class StackProfile extends Component {
  render() {
    return (
      <StackConfigure />
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

});
