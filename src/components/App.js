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
  StatusBar
} from 'react-native';
import ProfileDrawer from './ProfileDrawer';


export default class App extends Component {
  componentWillMount(){
    StatusBar.setHidden(true);
  }
  render() {
    return (
      // <View style={styles.container}>
        <ProfileDrawer/>
      //  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00e640',
  },
 
});
