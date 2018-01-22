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
import RadioButton from 'radio-button-react-native';
const {width,height}=Dimensions.get('window');

var ImagePicker = require('react-native-image-picker');

var options = {
  tite: 'Select Avatar',
  customButtons: [
    {
      name: 'fb', title: 'Choose Photo from Facebook',
    },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}



export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      avartarSource: null
    }

  }
  handleOnPress=(value) =>{
    this.setState({ value: value })
  }
  show=() =>{
    ImagePicker.launchImageLibrary(options, res => {
      console.log('Res=', res);
      if (res.didCancel) {
        console.log('User canceled image picker');
      } else if (res.error) {
        console.log('ImagePicker Err ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        let source = { uri: res.uri,crop: {left: 10, top: 50, width: 20, height: 40} };
        this.setState({
          avartarSource: source
        });
      }
    })
  }
  render() {
    return (
      <View style={{ backgroundColor:'#b7ffef', height:height}}>
        <View style={{marginTop: 20, padding: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Albums')}
            style={{ backgroundColor: '#4dbebb', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
            style={{ backgroundColor: '#4374fd', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>DONE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.show}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.state.avartarSource == null ? <Image
            style={{ height: 200, width: 200, borderRadius:50}}
            source={require('../../images/smile.png')}
          />:
         <Image
            style={{ height: 200, width: 200,borderRadius:100 }}
            source={this.state.avartarSource}
          />}
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
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <RadioButton currentValue={this.state.value} value={0} onPress={this.handleOnPress}>
              <Text>Male</Text>
            </RadioButton>
            <RadioButton
              currentValue={this.state.value} value={1} onPress={this.handleOnPress}>
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
  },

});
