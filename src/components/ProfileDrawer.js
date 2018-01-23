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
import StackMain from './StackMain';
import TabMain from './TabMain';
import EditProfile from './Profile/EditProfile'
import StackProfile from './Profile/StackProfile';

const {height, width}=Dimensions.get('window');

const DrawerConfigure = DrawerNavigator({
  Home: {
    // screen: StackMain,
    screen: TabMain,
  },
  // EditProfile:{
  //   screen: EditProfile
  // }
  StackProfile:{
    screen: StackProfile
  }
},
  {
    drawerBackgroundColor: '#b7ffef',
    drawerWidth:width*0.9,
    useNativeAnimations: true,
    contentComponent: (props) => (
      <ScrollView style={{ marginTop: 40, padding: 10 }}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require('../images/smile.png')}
          />
        </TouchableOpacity>
        <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 25, margin: 15 }}>Tina</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../images/birthdayCake.png')}
          />
          <Text>1995-12-07</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../images/mail.png')}
          />
          <Text>nttinh995@gmail.com</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../images/male.png')}
          />
          <Text>Female</Text>
        </View>
        <TouchableOpacity 
        onPress={()=>{props.navigation.navigate('StackProfile')}}
        style={{ backgroundColor: 'rgb(90,100,174)', padding: 5, borderRadius: 5, width: 80, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 15}}>Edit</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 25,fontWeight:'bold',margin:14 }}>Reminder List:</Text>
        <FlatList
        // data={this.props.data}
        // extraData={this.state}
        // keyExtractor={this._keyExtractor}
        // renderItem={this._renderItem}
      />
      <View style={{backgroundColor:'#4dbebb', padding:7, marginBottom:20}}>
      <Text style={{fontSize: 20 }}>Reminder List:</Text>
      <Text style={{fontSize: 20}}>Reminder List:</Text>
      </View>
      <TouchableOpacity style={{ backgroundColor: 'rgb(90,100,174)', padding: 5, borderRadius: 5, width: 80, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 15}}>Show All</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 15}}>CopyRight@Enclave 2017</Text>
        

        <DrawerItems
            {...props}
            getLabel={(scene) => (
              <View style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'pink',
                padding: 10,
                margin: 10,
                width: '90%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={styles.buttonText}>{props.getLabel(scene)}</Text>
              </View>
            )}
          />
      </ScrollView>
    )
  })


export default class ProfileDrawer extends Component {
  render() {
    return (
      <DrawerConfigure />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
