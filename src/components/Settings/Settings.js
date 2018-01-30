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
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
// import Swipeout from 'react-native-swipeout';
import ReminderItem from './ReminderItem';
import Filter from './Filter';
import { StackNavigator } from 'react-navigation';

const { width, height } = Dimensions.get('window');

class Reminder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageDemo: [
        { id: 1, uri: 'https://image.tmdb.org/t/p/w185/5CGjlz2vyBhW5xHW4eNOZIdgzYq.jpg' },
        { id: 2, uri: 'https://image.tmdb.org/t/p/w185/5CGjlz2vyBhW5xHW4eNOZIdgzYq.jpg' },
        { id: 3, uri: 'https://image.tmdb.org/t/p/w185/5CGjlz2vyBhW5xHW4eNOZIdgzYq.jpg' },
      ],
      deletedRowKey: null,
    }
  }
  refreshFlatList = (deletedKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: deletedKey
      }
    })
  }

  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/setting.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {

    return (
      // <View style={styles.container}>
      <FlatList
        data={this.state.imageDemo}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) =>

          <ReminderItem imageDemo={this.state.imageDemo} item={item} index={index} parentFlatList={this} />
        }
      ></FlatList>

      // </View>
    );
  }
}

const StackConfigure=StackNavigator({
  // Reminder:{screeen: Reminder},
  Filter:{screen:Filter},
})
export default class Settings extends React.Component{
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/setting.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  render(){
    return(
      <StackConfigure/>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },

});

