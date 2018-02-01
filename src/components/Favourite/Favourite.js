/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  FlatList
} from 'react-native';
import FavouriteItem from './FavouriteItem';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import DetailMovie from '../Home/DetailMovie';
import Header from '../Header/Header';
import {StackNavigator} from 'react-navigation';


class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFavourite: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    let header = (<Header navigation={navigation} titleHeader={'Favourite'} />)
    return { header }
  }

  getFavourite = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyListFavourite');
      if (value !== null) {
        // console.log(JSON.parse(value));
        this.setState({ listFavourite: JSON.parse(value) });
      } else {
        console.log('dont have data');
        this.setState({ listFavourite: JSON.parse(value) });
        // return [];
      }
    } catch (error) {
      return [];
    }
  }

  componentDidMount(){
    this.getFavourite();
  }
  componentWillUpdate(){
    this.getFavourite();
  }
 

  static navigationOptions = {
    tabBarLabel: 'Favourites',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/favourite.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Button title="click"
          onPress={() => this.getFavourite()}
        /> */}
        <FlatList
          //  refreshing={false}
          //  onRefresh={()=>this._onRefresh(this.state.page)}
          data={this.state.listFavourite}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <FavouriteItem item={item} />
          }
        ></FlatList>
      </View>
    );
  }
}
const StackConfigure = StackNavigator({
  Favourite: {
    screen: Favourite ,
  },
  DetailMovie: {
    screen: DetailMovie,
  }
}, {

  })

 export default StackConfigure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
