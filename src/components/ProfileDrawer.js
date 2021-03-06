import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';

import getInfo from './Profile/getInfo';
import { getTableList, getReminderLimit } from '../databases/Schemas';
import realm from '../databases/Schemas';

const { height, width } = Dimensions.get('window');

class ProfileDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Tina',
      birthDay: '1995-07-12',
      email: 'nttinh995@gmail.com',
      value: 0,
      avartarSource: '',
      listReminder: [],
    },
      this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    getReminderLimit()
      .then(listReminder => {
        this.setState({ listReminder })
      })
      .catch(err => {
        this.setState({ listReminder: [] })
        alert(`Error${err}`)
      })
  }
  componentWillUpdate() {
    getInfo()
      .then(myInfo => {
        if (JSON.stringify(myInfo) != JSON.stringify([])) {
          this.setState({
            name: myInfo.name,
            birthDay: myInfo.birthDay,
            email: myInfo.email,
            value: myInfo.gender,
            avartarSource: myInfo.avatar
          })
        }
      })
      ;
  }
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.avatar}>
          {this.state.avartarSource === '' ?
            <Image
              style={styles.avatarImage}
              source={require('../images/smile.jpg')}
            />
            :
            <Image
              style={styles.avatarImage}
              source={this.state.avartarSource}
            />}
        </TouchableOpacity>
        <Text style={styles.textName}>{this.state.name}</Text>
        <View style={styles.infor}>
          <Image
            style={styles.imageInfor}
            source={require('../images/birthdayCake.png')}
          />
          <Text style={styles.fontText}>{this.state.birthDay}</Text>
        </View>
        <View style={styles.infor}>
          <Image
            style={styles.imageInfor}
            source={require('../images/mail.png')}
          />
          <Text style={styles.fontText}>{this.state.email}</Text>
        </View>
        <View style={styles.infor}>
          <Image
            style={styles.imageInfor}
            source={require('../images/male.png')}
          />
          {this.state.value === 0 ? <Text style={styles.fontText}>Male</Text>
            :
            <Text style={styles.fontText}>Female</Text>
          }
        </View>
        <TouchableOpacity
          onPress={() => { navigation.navigate('EditProfile') }}
          style={styles.btnEdit}>
          <Text style={styles.txtEdit}>Edit</Text>
        </TouchableOpacity>
        {
          JSON.stringify(this.state.listReminder) != JSON.stringify([]) ?
        <View>
          <Text style={styles.txtReminder}>Reminder List:</Text>
        <FlatList
          data=
          {this.state.listReminder}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: '#74fcc8',
              padding: 7,
              marginBottom: 20
            }}>
              <Text style={{ fontSize: 20 }}>{item.title} - {item.year_release} - {item.vote_average}/10</Text>
              <Text style={{ fontSize: 20 }}>
                {
                  item.time_reminder.getFullYear()
                  + "-" +
                  (item.time_reminder.getMonth() <= 9 ? ('0' + (item.time_reminder.getMonth() + 1)) : (item.time_reminder.getMonth() + 1))
                  + "-" +
                  (item.time_reminder.getDate() <= 9 ? ('0' + item.time_reminder.getDate()) : item.time_reminder.getDate())
                  + " "
                  + (item.time_reminder.getHours() <= 9 ? ('0' + item.time_reminder.getHours()) : item.time_reminder.getHours())
                  + ":" +
                  (item.time_reminder.getMinutes() <= 9 ? ('0' + item.time_reminder.getMinutes()) : item.time_reminder.getMinutes())
                }
              </Text>
            </View>
          )
          }
        ></FlatList>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reminder', )}
          style={styles.btnShowAll}>
          <Text style={styles.txtEdit}>Show All</Text>
        </TouchableOpacity>
        </View>
        : null}
        
        <Text style={{ fontSize: 15, alignSelf: 'center', marginTop:20 }}>CopyRight@Enclave 2017</Text>
      </ScrollView>
    )
  }
}
export default ProfileDrawer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 10,
    backgroundColor: '#eff7fc'
  },
  avatar: {
    alignSelf: 'center'
  },
  avatarImage: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
  textName: {
    fontSize: 25,
    margin: 15,
    alignSelf: 'center'
  },
  infor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageInfor: {
    height: 26,
    width: 26,
    marginRight: 20
  },
  fontText: {
    fontSize: 17
  },
  btnEdit: {
    backgroundColor: 'rgb(90,100,174)',
    padding: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
    alignSelf: 'center'
  },
  txtEdit: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  }
  ,
  txtReminder: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 14
  },
  btnShowAll: {
    backgroundColor: 'rgb(90,100,174)',
    padding: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 5
  }

});
