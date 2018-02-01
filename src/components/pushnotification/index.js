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
    Platform,
    Button,
    Alert,Picker, AppState, PushNotificationIOS
} from 'react-native';

var PushNotification=require('react-native-push-notification');

class Push extends Component {
    componentDidMount() {
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);

                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
    }
    render() {
        return (
            null
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    picker: {
      width: 100,
    },
  });
  
  export default class App extends Component {
    constructor(props) {
      super(props);
      this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }
  
    componentDidMount() {
      AppState.addEventListener('change', this.handleAppStateChange);
    }
  
    componentWillUnmount() {
      AppState.removeEventListener('change', this.handleAppStateChange);
    }
  
    handleAppStateChange(appState) {
      if (appState === 'background') {
        let date = new Date(Date.now() + (5 * 1000));
        console.log(date)
  
        // if (Platform.OS === 'ios') {
        //   date = date.toISOString();
        // }
  
        PushNotification.localNotificationSchedule({
          message: "My Notification Message",
          date,
        });
      }
    }
  
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Choose your notification time in seconds.
          </Text>
          {/* <Picker
            style={styles.picker}
            selectedValue={5}
            // onValueChange={(seconds) => this.setState({ seconds })}
          >
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="15" value={15} />
          </Picker> */}
          <Push />
        </View>
      );
    }
  }