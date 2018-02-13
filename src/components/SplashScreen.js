import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
export default class Splash extends Component {
  static navigationOptions = {
    header: null
  }
  componentWillMount() {
    setTimeout(() => { this.props.navigation.navigate('DrawerConfigure') }
      , 1500)
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#99d4a3', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: width / 3, color: 'white' }}>THE</Text>
        <Text style={{ fontSize: width / 3, color: 'white' }}>MOVIE</Text>
      </View>
    );
  }
}