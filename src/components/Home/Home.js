/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text, Button,
  View,
  Image, TouchableOpacity, Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Popular from './Popular';
import DetailMovie from './DetailMovie';
import Header from '../Header/Header';

const { width, height } = Dimensions.get('window');

const Home = StackNavigator({
  Popular: {
    screen: Popular ,
  },
  DetailMovie: {
    screen: DetailMovie,
  }
}, {

  })
 export default Home;

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