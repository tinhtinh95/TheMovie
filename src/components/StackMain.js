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
  Dimensions,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TabMain from './TabMain';
import Header from './Header/Header';


const { width, height } = Dimensions.get('window');

export default class StackMain extends Component {

  // static navigationOptions = {
    // drawerLabel: none,
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../images/home.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  //   drawerPosition:'right'
  // };


  render() {
    return (
      <View style={styles.container}>
        {/* <Header navigation={this.props.navigation}/> */}
        <TabMain />
         {/* <Button title="click"
        // onPress={()=>this.props.navigation.navigate('DrawerOpen')}
        // /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgb(90,100,174)',
  },
});
