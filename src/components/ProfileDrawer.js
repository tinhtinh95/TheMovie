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
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import TabMain from './TabMain';
import EditProfile from './Profile/EditProfile';
import getInfo from './Profile/getInfo';

const { height, width } = Dimensions.get('window');



class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Tina',
      birthDay: '1995-07-12',
      email: 'nttinh995@gmail.com',
      value: 0,
      avartarSource: '',
    }
  }

  componentWillUpdate() {
    getInfo()
      .then(myInfo => {
        if(JSON.stringify(myInfo) != JSON.stringify([])){
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
              source={require('../images/smile.png')}
            />
            :
            <Image
              style={{ height: 200, width: 200, borderRadius: 100 }}
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
        <Text style={styles.txtReminder}>Reminder List:</Text>
        <FlatList
        // data={this.props.data}
        // extraData={this.state}
        // keyExtractor={this._keyExtractor}
        // renderItem={this._renderItem}
        />
        <View style={{
          backgroundColor: '#4dbebb',
          padding: 7,
          marginBottom: 20
        }}>
          <Text style={{ fontSize: 20 }}>Reminder List:</Text>
          <Text style={{ fontSize: 20 }}>Reminder List:</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={styles.btnShowAll}>
          <Text style={styles.txtEdit}>Show All</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15, alignSelf: 'center' }}>CopyRight@Enclave 2017</Text>
      </ScrollView>
    )
  }
}



const DrawerConfigure = DrawerNavigator({
  Home: {
    screen: TabMain,
  },
  EditProfile: {
    screen: EditProfile
  }
},
  {
    drawerBackgroundColor: '#b7ffef',
    drawerWidth: width * 0.9,
    useNativeAnimations: true,
    contentComponent: ({ navigation }) => <Profile navigation={navigation} />
  })

export default DrawerConfigure;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10
  },
  avatar: {
    alignSelf: 'center'
  },
  avatarImage: {
    height: 150,
    width: 150
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
