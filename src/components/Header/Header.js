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
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrid: true
    }
  }


  _toggleGridList = () => {
    this.setState({isGrid:!this.state.isGrid});
    this.props.navigation.state.params.toggleGridList();
    
  }

  render() {
    if (this.props.navigation.state.params !== undefined) {
      const {toggleGridList } = this.props.navigation.state.params;
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
          >
            <Image source={require('../../images/open.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{this.props.titleHeader}</Text>
          <TouchableOpacity
            onPress={this._toggleGridList}
          >
            {this.state.isGrid ?
              <Image source={require('../../images/grid.png')}
                style={styles.icon}
              />
              :
              <Image source={require('../../images/nonGrid.png')}
                style={styles.icon}
              />}
          </TouchableOpacity>
        </View>

      );
    } else {
      return (
        <View></View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(90,100,174)',
  },
  icon: {
    margin: 10,
    width: 26,
    height: 26,
    tintColor: 'white'
  },
  titleHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
