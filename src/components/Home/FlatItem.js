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
import { connect } from 'react-redux';


const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";

export default class FlatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFavourite: [],
      favourite: 0,
    }
  }
  setFavourite = async (item) => {
    item['favourite'] = true;
    var listNew = [];
    console.log(item);
    listNew = this.state.listFavourite.concat(item);
    console.log('state ban dau:',this.state.listFavourite)
    console.log('listNew:', listNew);
    try {
      await this.setState({ listFavourite: listNew, favourite: 1 });
      await AsyncStorage.setItem('@MyListFavourite', JSON.stringify(listNew));
      console.log('state sau khi load', this.state.listFavourite);
    } catch (error) {
      // Error saving data
    }
  }
  getFavourite = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyListFavourite');
      if (value !== null) {
        this.setState({ listFavourite: JSON.parse(value) });
      } else {
        console.log('dont have data');
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  // componentDidMount() {
  //   this.getFavourite();
  // }
  componentWillUpdate() {
    this.getFavourite();
  }

  render() {
    // const { listFavourite } = this.props;
    // console.log(JSON.stringify(listFavourite));
    const { item } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetailMovie', { item })}
        style={styles.container}>
        <View style={styles.above}>
          <View style={{ width: width * 0.8 }}><Text numberOfLines={1} style={styles.title}>{item.title}</Text></View>
          <TouchableOpacity
            onPress={() => this.setFavourite(item)}
          >
            {this.state.favourite === 0 ? <Image
              style={styles.icon}
              source={require('../../images/nonStar.png')}
            /> : <Image
                style={styles.icon}
                source={require('../../images/fullStar.png')}
              />}
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
      </TouchableOpacity>
    );
  }
}
// function mapStateToProps(state){
//   return{
//     listFavourite: state.listFavourite,
//   }
// }
// export default connect(mapStateToProps)(FlatItem);

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
