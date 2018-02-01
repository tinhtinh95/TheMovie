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

const StackConfigure = StackNavigator({
  Popular: {
    screen: Popular ,
    
  
  },
  DetailMovie: {
    screen: DetailMovie,
  }
}, {

  })

 export default StackConfigure;

// export default class Home extends Component {
//   static navigationOptions = {
//     tabBarLabel: 'Movies',
//     tabBarIcon: ({ tintColor }) => (
//       <Image
//         source={require('../../images/home.png')}
//         style={[styles.icon, { tintColor: tintColor }]}
//       />
//     ),
//   };

//   render() {
//     return (
//       // <Button title="ahihi" onPress={()=>this.props.navigation.navigate('DrawerOpen')}></Button>
//       <StackConfigure navgation1={this.props.navigation}/>
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