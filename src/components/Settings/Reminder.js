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
import { getTableList } from '../../databases/Schemas';
import realm from '../../databases/Schemas';

const { width, height } = Dimensions.get('window');

export default class Reminder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listReminder:[],
      deletedRowKey: null,
    }
    this.reloadData();
    realm.addListener('change', () => {
        this.reloadData();
    });
  }
  reloadData=()=> {
    getTableList('REMINDER')
      .then(listReminder => {
        this.setState({ listReminder})
      })
      .catch(err => {
        this.setState({ listReminder:[]})
        alert(`Error${err}`)
      })
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
      <FlatList
      style={{paddingLeft:8, paddingRight:8, backgroundColor:'white'}}
        data={this.state.listReminder}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) =>
          <ReminderItem item={item} index={index} parentFlatList={this} />
        }
      ></FlatList>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },

});

