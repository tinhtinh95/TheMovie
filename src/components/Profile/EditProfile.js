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
      borderWidthName: 0,
      borderWidthMail: 0,
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
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.background}
            source={require('../../images/info.jpg')}
          />
        </View>
        <View style={styles.select}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={styles.cancel}>
            <Text style={{ fontSize: 20 }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._editInfo}
            style={styles.done}>
            <Text style={{ fontSize: 20 }}>DONE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.show}
          style={styles.imgContainer}>
          {this.state.avartarSource === null ?
            <Image
              style={styles.avatar}
              source={require('../../images/smile.jpg')}
            />
            :
            <Image
              style={styles.avatar}
              source={this.state.avartarSource}
            />}

        </TouchableOpacity>
        <TextInput style={[styles.name,
        { borderWidth: this.state.borderWidthName, }]}
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          onFocus={() => this.setState({ borderWidthName: 1 })}
          onBlur={() => this.setState({ borderWidthName: 0 })}
        />
        <View style={styles.viewProperties}>
          <Image
            style={styles.icon}
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
        <View style={styles.viewProperties}>
          <Image
            style={styles.icon}
            source={require('../../images/mail.png')}
          />
          <TextInput
            style={[styles.txtMail, { borderWidth: this.state.borderWidthMail, }]}
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            onFocus={() => this.setState({ borderWidthMail: 1 })}
            onBlur={() => this.setState({ borderWidthMail: 0 })}
          />
        </View>
        <View style={styles.viewProperties}>
          <Image
            style={styles.icon}
            source={require('../../images/male.png')}
          />
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <RadioButton currentValue={this.state.value} value={0} onPress={this.handleOnPress}>
              <Text style={{ fontSize: 17, marginRight:width/7 }} >Male</Text>
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
    backgroundColor: 'white',
    height: height
  },
  avatarContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  select: {
    marginTop: 20, padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  cancel: {
    backgroundColor: '#4dbebb',
    padding: 7,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  done: {
    backgroundColor: '#4374fd',
    padding: 7,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
  name: {
    width: width * 0.8,
    textAlign: 'center',
    padding: 3,
    fontSize: 25,
    borderColor: 'gray',
    borderRadius: 5,

    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  viewProperties: {
    paddingLeft: 10,
    flexDirection: 'row', alignItems: 'center', marginBottom: 15,
  },
  icon: {
    height: 26,
    width: 26,
    marginRight: 20
  },
  txtMail: {
    width: width * 0.8,
    borderColor: 'gray',
    borderRadius: 5,

    padding: 5,
    fontSize: 17
  }
});
