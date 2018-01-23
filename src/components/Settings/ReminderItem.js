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


const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";


export default class ReminderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    }
  }

  render() {
    const swipeoutSetting = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        this.setState({ activeRowKey: null })
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.id })
      },
      right: [
        {
          onPress: () => {
            const deletingRow=this.state.activeRowKey;
            Alert.alert(
              'Notification',
              'Do you want to delete?',
              [
                {
                  text: 'CANCEL', onPress: () =>
                    console.log('Cancel Pressed')
                },
                {
                  text: 'YES', onPress: () => {
                    console.log('Cancel Pressed');
                    this.props.imageDemo.splice(this.props.index,1);
                    this.props.parentFlatList.refreshFlatList(deletingRow)
                  }

                },
              ],
              { cancelable: false }
            )
          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };
    const { item } = this.props;
    return (
      <Swipeout style={{ backgroundColor: 'white' }} {...swipeoutSetting} >
        <View style={{
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'pink',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <Image
            style={{ marginRight: 10, height: height / 6, width: width / 3 }}
            source={{ uri: 'https://image.tmdb.org/t/p/w185/5CGjlz2vyBhW5xHW4eNOZIdgzYq.jpg' }}
          />
          <View style={{}}>
            <Text style={{}}>Overview:</Text>
            <Text style={{ fontSize: 17 }}>...</Text>
          </View>
          <Image
            style={{ tintColor: 'gray' }}
            source={require('../../images/stepBack.png')}
          />

        </View>
      </Swipeout>
    );
  }
}

