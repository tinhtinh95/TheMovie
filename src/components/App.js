import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import ProfileDrawer from './ProfileDrawer';
import { Provider } from 'react-redux';
import store from '../reducer/configureStore';

export default class App extends Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <Provider store={store}>
        <ProfileDrawer />
      </Provider>
      // <Text>fff</Text>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00e640',
  },

});