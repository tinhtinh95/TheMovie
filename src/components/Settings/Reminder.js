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
import ReminderItem from './ReminderItem';
import { getTableList } from '../../databases/Schemas';
import realm from '../../databases/Schemas';

const { width, height } = Dimensions.get('window');

export default class Reminder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listReminder: [],
      deletedRowKey: null,
    }
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    getTableList('REMINDER')
      .then(listReminder => {
        this.setState({ listReminder })
      })
      .catch(err => {
        this.setState({ listReminder: [] })
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
  static navigationOptions = ({ navigation }) => {
    let header = (
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={{ flexDirection: 'row', }}
          onPress={() => { navigation.goBack() }}
        >
          <Image source={require('../../images/stepBack.png')}
            style={styles.iconHeader}
          />
          <Text style={[styles.titleHeader, { alignSelf: 'center' }]}>Settings</Text>
        </TouchableOpacity>
        <Text style={[styles.titleHeader,
        {
          fontWeight:'bold'
        }]}>All Reminders</Text>
        <View style={{width:width/4}}></View>
      </View>
    )
    return { header }
  }
  render() {
    return (
      <FlatList
        style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'white' }}
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
  containerHeader: {
    alignItems: 'center',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(90,100,174)',
  },
  iconHeader: {
    margin: 5,
    width: 24,
    height: 24,
    tintColor: 'white'
  },
  titleHeader: {
    color: 'white',
    fontSize: 18,
  },
});
