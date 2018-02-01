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
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';


const { height, width } = Dimensions.get('window');
const uri = "http://image.tmdb.org/t/p/w185";

export default class FlatItem extends Component {
  getFavourite = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyListFavourite');
      if (value !== null) {
        return JSON.parse(value);
      } else {
        console.log('dont have data');
        return [];
      }
    } catch (error) {
      return [];
    }
  }
  removeFavourite = async () => {
    const { item } = this.props;
    var listNew = []
    await this.getFavourite()
      .then(list => {
        console.log(list)
        if (item.favourite) {
          console.log(item.favourite)
          list = list.filter(
            function (e) {
              return e.id !== item.id;
            })
          listNew = list;
        }
      })
    await console.log(listNew);
    await AsyncStorage.setItem('@MyListFavourite', JSON.stringify(listNew));
  }
  AlertRemoveFavourite = () => {
    Alert.alert(
      'Warning',
      'Do you want to delete this favourite film',
      [
        {
          text: 'Cancel', onPress: () => console.log('Cancel')
          , style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            this.removeFavourite();
          }
        },
      ],
      { cancelable: false }
    )
  }
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.above}>
          <View style={{ width: width * 0.8 }}><Text numberOfLines={1} style={styles.title}>{item.title}</Text></View>
          <TouchableOpacity
            onPress={() => this.AlertRemoveFavourite()}
          >
            <Image
              style={styles.icon}
              source={require('../../images/fullStar.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bellow}>
          <Image
            style={{ flex: 2, marginRight: 10, height: height / 4, width: width / 3 }}
            source={{ uri: `${uri}${item.poster_path}` }}
          />
          <View style={{ flex: 3 }}>
            <View style={styles.mainRight}>
              <Text style={styles.textRight}>Release date:   </Text>
              <Text style={styles.textRed}>{item.release_date}</Text>
            </View>
            <View style={styles.mainRight}>
              <Text style={styles.textRight}>Rating:   </Text>
              <Text style={styles.textRed}>{item.vote_average}/10</Text>
            </View>
            <View>
              <Text style={styles.textRed}>Overview:</Text>
              <Text numberOfLines={3} style={{ fontSize: 17 }}>{item.overview}</Text>
            </View>

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#4bcb4d',
    paddingTop: 10,
    paddingBottom: 10
  },
  above: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue'
  },
  bellow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainRight: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  textRight: {
    fontSize: 16
  },
  textRed: {
    color: 'red',
    fontSize: 16
  }

});
