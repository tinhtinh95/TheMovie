import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput, DatePickerIOS, Button,
  KeyboardAvoidingView
} from 'react-native';
import RadioButton from 'radio-button-react-native';
const { width, height } = Dimensions.get('window');
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import getInfo from './getInfo';
import saveInfo from './saveInfo';

import DateTimePicker from 'react-native-modal-datetime-picker';

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
      name: 'Tina',
      birthDay: '1995-07-12',
      email: 'nttinh995@gmail.com',
      value: 0,
      avartarSource: null,
      isDateTimePickerVisible: false,
      borderWidthName:0,
      borderWidthMail:0,
    }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    currentDate = new Date();
    if (date < currentDate) {
      let month = (date.getMonth() <= 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1))
      let day = date.getDate() <= 9 ? ('0' + date.getDate()) : date.getDate();
      var dn = date.getFullYear() + "-" + month + "-" + day;
      this.setState({ birthDay: dn })
    } else {
      Alert.alert("Invalid");
      this._showDateTimePicker();
    }
  };
  handleOnPress = (value) => {
    this.setState({ value: value })
  }
  show = () => {
    ImagePicker.launchImageLibrary(options, res => {
      console.log('Res=', res);
      if (res.didCancel) {
        console.log('User canceled image picker');
      } else if (res.error) {
        console.log('ImagePicker Err ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        let source = { uri: res.uri, crop: { left: 10, top: 50, width: 20, height: 40 } };
        this.setState({
          avartarSource: source
        });
      }
    })
  }
  _editInfo = async () => {
    var object = {
      "name": this.state.name,
      "birthDay": this.state.birthDay,
      "email": this.state.email,
      "gender": this.state.value,
      "avatar": this.state.avartarSource
    };
    this.props.navigation.navigate('Home');
    saveInfo(object);
  }
  componentDidMount() {
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
    return (
      <KeyboardAvoidingView style={{ backgroundColor: 'white', height: height }}>
        <View style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
            }}
            source={require('../../images/info.jpg')}
          />
        </View>
        <View style={{
          marginTop: 20, padding: 10,
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={{ backgroundColor: '#4dbebb', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._editInfo}
            style={{ backgroundColor: '#4374fd', padding: 7, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>DONE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.show}
          style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          {this.state.avartarSource === null ?
            <Image
              style={{ height: 200, width: 200, borderRadius: 50 }}
              source={require('../../images/smile.png')}
            />
            :
            <Image
              style={{ height: 200, width: 200, borderRadius: 100 }}
              source={this.state.avartarSource}
            />}

        </TouchableOpacity>
        <TextInput style={[{
          width: width * 0.8,
          textAlign: 'center',
          padding: 3,
          fontSize: 25,
          borderColor: 'gray',
          borderRadius: 5,
          borderWidth: this.state.borderWidthName,
          marginBottom: 20,
          justifyContent:'center',
          alignSelf:'center'
        },]}
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          onFocus={()=>this.setState({borderWidthName:1})}
          onBlur={()=>this.setState({borderWidthName:0})}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../../images/birthdayCake.png')}
          />
          <Text style={{ fontSize: 17 }} onPress={this._showDateTimePicker}>{this.state.birthDay}</Text>
          <View style={{ flex: 1 }}>
            <DateTimePicker
              date={new Date(this.state.birthDay)}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../../images/mail.png')}
          />
          <TextInput
            style={{
              width: width * 0.8,
              borderColor: 'gray',
              borderRadius: 5,
              borderWidth: this.state.borderWidthMail,
              padding: 5,
              fontSize: 17
            }}
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            onFocus={()=>this.setState({borderWidthMail:1})}
            onBlur={()=>this.setState({borderWidthMail:0})}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, }}>
          <Image
            style={{ height: 26, width: 26, marginRight: 20 }}
            source={require('../../images/male.png')}
          />
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <RadioButton currentValue={this.state.value} value={0} onPress={this.handleOnPress}>
              <Text style={{ fontSize: 17 }} >Male</Text>
            </RadioButton>

            <RadioButton currentValue={this.state.value} value={1} onPress={this.handleOnPress}>
              <Text style={{ fontSize: 17 }} >Female</Text>
            </RadioButton>

          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
  },

});
