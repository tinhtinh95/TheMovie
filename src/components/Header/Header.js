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
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        onPress={()=>{this.props.navigation.navigate('DrawerOpen')}}
        >
          <Image source={require('../../images/open.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text>Header</Text>
        <TouchableOpacity>
          <Image source={require('../../images/open.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

    );
  }
}

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
    tintColor:'white'
  },
});
