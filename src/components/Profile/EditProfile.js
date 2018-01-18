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
  FlatList
} from 'react-native';
import RadioButton from 'radio-button-react-native';
//  yarn add react-navigation
// yarn add radio-button-react-native


export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

  }
  handleOnPress(value) {
    this.setState({ value: value })
  }

  render() {
    return (
      <View style={{ marginTop: 20, padding: 10 }}>
      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
      <TouchableOpacity 
        // onPress={()=>this.props.navigation.navigate('Albums')}
        style={{ backgroundColor: '#4dbebb', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 20}}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>{props.navigation.navigate('EditProfile')}}
        style={{ backgroundColor: '#4374fd', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 20}}>DONE</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity 
        onPress={()=>this.props.navigation.navigate('Albums')}
        style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require('../../images/smile.png')}
          />
        </TouchableOpacity>
        <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 25, margin: 15 }}>Tina</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../../images/birthdayCake.png')}
          />
          <Text>1995-12-07</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../../images/mail.png')}
          />
          <Text>nttinh995@gmail.com</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../../images/male.png')}
          />
          <View style={{justifyContent:'space-between', flexDirection:'row'}}>
          <RadioButton currentValue={this.state.value} value={0} onPress={this.handleOnPress.bind(this)}>
            <Text>Male</Text>
          </RadioButton>
          <RadioButton 
          currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>
            <Text>Female</Text>
          </RadioButton>
        </View>
        </View>
        
      </View>
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
