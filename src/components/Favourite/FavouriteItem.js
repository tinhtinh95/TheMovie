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
// import { AlertRemoveFavourite } from '../../actions/favourite';
import { deleteFavourite } from './../../databases/Schemas';

const { height, width } = Dimensions.get('window');
const uri = "http://image.tmdb.org/t/p/w185";

export default class FlatItem extends Component {

  AlertRemoveFavourite = (item) => {
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
            deleteFavourite(item.id).then().catch(error => {
              alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
            })
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
            onPress={() => this.AlertRemoveFavourite(item)}
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





