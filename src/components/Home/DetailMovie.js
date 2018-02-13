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
import { insertNewReminder, getTableList, deleteReminder } from './../../databases/Schemas';
import realm from './../../databases/Schemas';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from './Icon';

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
      timeReminder: new Date(),
      reminderColor: '#b00060'
    }

  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const { item } = this.props.navigation.state.params;
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    const newReminder = {
      id: item.id,
      title: item.title,
      year_release: new Date(item.release_date).getFullYear(),
      vote_average: item.vote_average,
      time_reminder: date,
      poster_path: item.poster_path,
    };
    console.log(newReminder)
    insertNewReminder(newReminder).then(
    ).catch((error) => {
      alert(`Insert new Reminder  error ${error}`);
    });
    this.setState({ timeReminder: date})
  };
  setReminder = async (item) => {
    var check = false;
    getTableList('REMINDER')
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
          AlertRemoveReminder(item);
        } else {
          this._showDateTimePicker();
        }
      })
      .catch(err => console.log(err))
  }
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
    fetch(`https://api.themoviedb.org/3/movie/${params.item.id}/credits?api_key=0267c13d8c7d1dcddb40001ba6372235`)
      .then(res => res.json())
      .then(resJson => {
        this.setState({ listCast: resJson.cast })
      })
      .catch(err => console.log(err));
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = this.state.timeReminder;
      console.log('here', date)
      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
      });
    }
  }
  render() {
    const { params } = this.props.navigation.state;
    const { favourite } = this.state;
    return (
      <View style={styles.container}>
        <Push />
        <View style={styles.above}>
          <Icon item={params.item}/>
          <View style={styles.containerAbove}>
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
        <View style={[styles.containerMid]}>
          <View style={styles.containerImg}>
            <Image style={styles.poster}
              source={{ uri: `${uri}${params.item.poster_path}` }}
            >
            </Image>
            <TouchableOpacity
              onPress={
                () =>
                  this.setReminder(params.item)
              }
              style={[styles.reminder, { backgroundColor: this.state.reminderColor }]}>
              <Text style={[styles.text, { color: 'white' }]}>REMINDER</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode='datetime'
                date={new Date()}
              />
            </View>
          </View>
          <ScrollView>
            <Text style={styles.textRed}>Overview:</Text>
            <Text style={styles.text}>{params.item.overview}</Text>
          </ScrollView>
        </View>
        <View style={styles.containerBellow}>
          <Text style={styles.txtCast}>Cast & Crew</Text>
          <FlatList
            horizontal={true}
            data={this.state.listCast}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
              <View style={styles.containerItemCast}>
                <Image
                  source={{ uri: `${uri}${item.profile_path}` }}
                  style={styles.imgCast}
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
  },
  containerMid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0,
    height: height / 2.5
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
  },
  containerAbove: {
    paddingTop: 10
  },
  containerImg: {
    marginRight: 10,
    marginBottom: 10
  },
  poster: {
    width: width * 0.44,
    height: height * 0.27,
    marginBottom: 10
  },
  reminder: {
    borderRadius: 5,
    padding: 5,
    width: width * 0.37,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  containerBellow: {
    marginBottom: height * 0.15
  },
  txtCast: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8
  },
  containerItemCast: {
    width: width * 0.24,
    height: height * 0.35,
    marginRight: 7
  },
  imgCast: {
    width: width * 0.24,
    height: height * 0.15
  }
});
