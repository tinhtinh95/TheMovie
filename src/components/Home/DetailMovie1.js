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
  Button
} from 'react-native';
import { AsyncStorage } from 'react-native';


const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";

export default class DetailMovie1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listFavourite: [],
      favourite: 0,
    }
  }

  static navigationOptions = {
    title: 'DetailMovie',
  }

  setFavourite = async (item) => {
    console.log('truoc')
    // let listNew=[];
    // listNew = this.state.listFavourite.concat(item );
    // console.log(listNew)
    this.setState({ listFavourite: this.state.listFavourite.concat(item), favourite: 1 });
    console.log(this.state.listFavourite);
    try {
      await AsyncStorage.setItem('@MyListFavourite', JSON.stringify(listFavourite));
      console.log('sau');
    } catch (error) {
      // Error saving data
    }
  }



  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity>
            <Image source={require('../../images/nonStar.png')} />
          </TouchableOpacity>
          <View>
            <View>
              <Text> Release date: </Text>
              <Text> Release date: </Text>
            </View>
            <View>
              <Text> Release date: </Text>
              <Text> Release date: </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <Image>

          </Image>
          <View>
            <Text>Overview:</Text>
            <Text></Text>
          </View>
        </ScrollView>
        <View>
          <Text>Cast & Crew</Text>
          
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
