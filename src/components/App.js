import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import store from '../reducer/configureStore';
import Main from './routes';

export default class App extends Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}