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
  TouchableOpacity, AppState, Alert,
  Button, ScrollView, FlatList, KeyboardAvoidingView, PushNotificationIOS
} from 'react-native';
import { AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";
import { AlertRemoveReminder, AlertRemoveFavourite } from '../../actions/model';
import { insertNewFavourite, getFavouriteList, deleteFavourite } from './../../databases/Schemas';
import realm from './../../databases/Schemas';
import DateTimePicker from 'react-native-modal-datetime-picker';

var PushNotification = require('react-native-push-notification');

class Push extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: "YOUR GCM SENDER ID",
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  render() {
    return (
      null
    )
  }
}
export default class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      isDateTimePickerVisible: false,
      listFavourite: [],
      favourite: 0,
      listCast: [],
    }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  // _handleDatePicked = (date) => {
  //   this._hideDateTimePicker();
  //   currentDate = new Date();
  //   if (date < currentDate) {
  //     var dn = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 
  //     date.getDate()+ " "+date.getHours()+":"+date.getMinutes();

  //     this.setState({ birthDay: dn })
  //   } else {
  //     Alert.alert("Invalid");
  //     this._showDateTimePicker();
  //   }
  // };}

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let header = (
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={{ flexDirection: 'row', }}
          onPress={() => { navigation.goBack() }}
        >
          <Image source={require('../../images/stepBack.png')}
            style={styles.iconHeader}
          />
          <Text style={[styles.titleHeader, { alignSelf: 'center' }]}>Back</Text>
        </TouchableOpacity>

        <Text style={[styles.titleHeader,
        {
          alignItems: 'center', alignContent: 'center'
        }]}>{params.item.title}</Text>
        <Text></Text>
      </View>
    )
    return { header }
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    const { params } = this.props.navigation.state;
    // console.log('params: ', params.item.id);
    fetch(`https://api.themoviedb.org/3/movie/${params.item.id}/credits?api_key=0267c13d8c7d1dcddb40001ba6372235`)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson.cast);
        this.setState({ listCast: resJson.cast })
      })
      .catch(err => console.log(err));

    getFavouriteList()
      .then(list => {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === params.item.id) {
            check = true;
            break;
          } else {
            check = false;
          }
        }
        if (check) {
          this.setState({ favourite: 1 })
        } else {
          this.setState({ favourite: 0 })
        }
      })
      .catch(err => console.log(err));

  }
  // componentDidMount() {
  //   AppState.addEventListener('change', this.handleAppStateChange);
  // }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (10 * 1000));
      // console.log(date)
      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
      });
    }
  }

  setReminder = (item) => {
    var check = false;
    getReminderList()
      .then(list => {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === item.id) {
            check = true;
            break;
          } else {
            check = false;
          }
        }
        if (check) {
          this.AlertRemoveReminder(item.id);
        } else {
          const newReminder = {
            id: item.id,
            title: item.title,
            year_release: new Date(item.release_date).getFullYear(),
            vote_average: item.vote_average,
            time_reminder: new Date(new Date() + 15 * 1000),
            poster_path: item.poster_path,
          };
          // console.log(newReminder)
          insertNewReminder(newReminder).then(
          ).catch((error) => {
            alert(`Insert new Reminder  error ${error}`);
          })
          AppState.addEventListener('change', this.handleAppStateChange);
        }
      })
      .catch(err => console.log(err))
  }

  AlertRemoveFavourite = (item) => {
    Alert.alert(
      'Warning',
      'Do you want to delete this favourite film',
      [
        {
          text: 'Cancel', onPress: () => {
            console.log('Cancel');
          }
          , style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            deleteFavourite(item.id).then().catch(error => {
              alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
            });
            this.setState({ favourite: 0 })
          }
        },
      ],
      { cancelable: false }
    )
  }

  setFavourite = (item) => {
    var check = false;
    getFavouriteList()
      .then(async (list) => {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === item.id) {
            check = true;
            break;
          } else {
            check = false;
          }
        }
        if (check) {
          this.AlertRemoveFavourite(item);
        } else {
          const newFavourite = {
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            overview: item.overview,
            release_date: item.release_date,
            poster_path: item.poster_path,
          };
          insertNewFavourite(newFavourite).then(
          ).catch((error) => {
            alert(`Insert new Favourite  error ${error}`);
          })
          this.setState({ favourite: 1 })
        }
      })
      .catch(err => console.log(err))
  }
  render() {
    const { params } = this.props.navigation.state;
    const { favourite } = this.state;
    return (
      <View style={styles.container}>
        <Push />
        <View style={styles.above}>
          {/* <TouchableOpacity onPress={() =>this.setFavourite(params.item)}
          >
            <Image
              style={styles.icon}
              source={require('../../images/nonStar.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.setFavourite(params.item)}
          >
            {favourite === 0
              ?
              <Image
                style={styles.icon}
                source={require('../../images/nonStar.png')}
              />
              :
              <Image
                style={styles.icon}
                source={require('../../images/fullStar.png')}
              />
            }
          </TouchableOpacity>
          <View style={{ paddingTop: 10 }}>
            <View style={styles.mainRight}>
              <Text style={styles.text}> Release date: </Text>
              <Text style={styles.textRed}> {params.item.release_date} </Text>
            </View>
            <View style={styles.mainRight}>
              <Text style={styles.text}> Release date: </Text>
              <Text style={styles.textRed}> {params.item.vote_average}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.bellow, { padding: 10, paddingTop: 0, height: height / 2.5 }]}>
          <View style={{ marginRight: 10, marginBottom: 10 }}>
            <Image style={{ width: width * 0.44, height: height * 0.27, marginBottom: 10 }}
              source={{ uri: `${uri}${params.item.poster_path}` }}
            >
            </Image>
            <TouchableOpacity
              onPress={() =>
                this._showDateTimePicker
                //this.setReminder(params.item)
              }
              style={{
                borderRadius: 5,
                backgroundColor: '#b00060',
                padding: 5,
                width: width * 0.37,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center'
              }}>
              <Text style={[styles.text, { color: 'white' }]}>REMINDER</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>
          </View>
          <ScrollView>
            <Text style={styles.textRed}>Overview:</Text>
            <Text style={styles.text}>{params.item.overview}</Text>
          </ScrollView>
        </View>
        <View style={{ marginBottom: height * 0.15 }}>
          <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>Cast & Crew</Text>
          <FlatList
            horizontal={true}
            data={this.state.listCast}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>//<Text>{item.profile_path}</Text>
              <View style={{ width: width * 0.24, height: height * 0.35, marginRight: 7 }}>
                <Image
                  source={{ uri: `${uri}${item.profile_path}` }}
                  style={{ width: width * 0.24, height: height * 0.15 }}
                />
                <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
              </View>
            }
          />
        </View>
      </View>
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
    margin: 10,
    width: 26,
    height: 26,
    tintColor: 'white'
  },
  titleHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  above: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue',
    margin: 20
  },
  bellow: {
    // marginTop: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainRight: {
    marginBottom: 10,
    flexDirection: 'row',

  },
  text: {
    fontSize: 16
  },
  textRed: {
    color: 'red',
    fontSize: 16
  }

});
