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
  Button, Alert
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { deleteReminder } from '../../databases/Schemas';

const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";

export default class ReminderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      opened: false,
      
    }
  }
  render() {
    const { item } = this.props;
    const swipeoutBtns = [
      {
        onPress: () => {
          const deletingRow = this.state.activeRowKey;
          Alert.alert(
            'Notification',
            'Do you want to remove this film?',
            [
              {
                text: 'CANCEL', onPress: () =>
                  console.log('Cancel Pressed')
              },
              {
                text: 'YES', onPress: () => {
                  deleteReminder(item.id).then().catch(error => {
                    alert(`Failed to delete Reminder with id = ${item.id}, error=${error}`);
                  })
                },

              }
            ],
            { cancelable: false }
          )
        },
        text: 'Delete',
        type: 'delete'
      }
    ]
    // const swipeoutSetting = {
    //   autoClose: true,
    //   onClose: (secId, rowId, direction) => {
    //     this.setState({ activeRowKey: null })
    //   },
    //   onOpen: (secId, rowId, direction) => {
    //     this.setState({ activeRowKey: this.props.item.id })
    //   },
    //   right: [
    //     {
    //       onPress: () => {
    //         const deletingRow = this.state.activeRowKey;
    //         Alert.alert(
    //           'Notification',
    //           'Do you want to delete?',
    //           [
    //             {
    //               text: 'CANCEL', onPress: () =>
    //                 console.log('Cancel Pressed')
    //             },
    //             {
    //               text: 'YES', onPress: () => {
    //                 deleteReminder(deletingRow).then().catch(error => {
    //                   alert(`Failed to delete Reminder with id = ${deletingRow}, error=${error}`);
    //                 })
    //                 this.props.parentFlatList.refreshFlatList(deletingRow)
    //               }
    //             },
    //           ],
    //           { cancelable: false }
    //         )
    //       },
    //       text: 'Delete', type: 'delete'
    //     }
    //   ],
    //   rowId: this.props.index,
    //   sectionId: 1
    // };

    var date =
      item.time_reminder.getFullYear()
      + "-" +
      (item.time_reminder.getMonth() <= 9 ? ('0' + (item.time_reminder.getMonth() + 1)) : (item.time_reminder.getMonth() + 1))
      + "-" +
      (item.time_reminder.getDate() <= 9 ? ('0' + item.time_reminder.getDate()) : item.time_reminder.getDate())
      + " "
      + (item.time_reminder.getHours() <= 9 ? ('0' + item.time_reminder.getHours()) : item.time_reminder.getHours())
      + ":" +
      (item.time_reminder.getMinutes() <= 9 ? ('0' + item.time_reminder.getMinutes()) : item.time_reminder.getMinutes())
    return (
      <Swipeout style={{ backgroundColor: 'white' }}
        //  {...swipeoutSetting}
        right={swipeoutBtns}
        autoClose
        onClose={() => this.setState({ opened: false })}
        openRight={this.state.opened}
        sensitivity={50}
      >
        <View style={styles.containerItem}>
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={{ uri: `${uri}${item.poster_path}` }}
            />
            <View>
              <Text numberOfLines={1} style={[styles.txt, { marginBottom: 20 }]}>{item.title} - {item.year_release} - {item.vote_average}/10</Text>
              <Text style={styles.txt}>{date}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.setState({ opened: true })}
            >
              <Image
                style={styles.openSwipe}
                source={require('../../images/openSwipe.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Swipeout>
    );
  }
}
const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'pink',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerImg: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width * 0.5,
    alignItems: 'center'
  },
  img: {
    marginRight: 10,
    height: height / 6,
    width: width / 3
  },
  txt: { fontSize: 17, },
  openSwipe: {
    tintColor: 'gray',
    height: 20,
    width: 20
  }
})

