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
  Button,
  Alert
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { getFavourite, removeFavourite, AlertRemoveFavourite } from '../../actions/favourite';
import { toggleFavourite } from '../../actions/actions';


const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";

class FlatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFavourite: [],
      favourite: 0,
      item: {}
    }
  }
  setFavourite = async (item) => {
    item['favourite'] = true;
    var listNew = [];
    await getFavourite()
      .then(list => {
        listNew = list
      })
      .catch(e => console.log(e))
    var check = false;
    if (JSON.stringify(listNew) === JSON.stringify([])) {
      listNew = listNew.concat(item);
    } else {
      for (var i = 0; i < listNew.length; i++) {
        if (listNew[i].id === item.id) {
          check = false;
          break;
        } else {
          check = true;
        }
      }
      if (check) {
        listNew = listNew.concat(item);
      }
    }
    await console.log('listNew:', listNew);
    await this.setState({ listFavourite: listNew, favourite: 1 });
    try {
      await AsyncStorage.setItem('@MyListFavourite', JSON.stringify(listNew));
    } catch (error) {
      // Error saving data
    }
    this.checkFavourite();
  }
  componentDidMount() {
    this.checkFavourite();
    const { item } = this.props;
    this.setState({ item: item })
  }
  checkFavourite = () => {
    const { item } = this.props;
    var check = false;
    getFavourite()
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
          this.setState({ favourite: 1 })
        }
      })
    // if (item.favourite) {
    //   this.setState({ favourite: 1 })
    // }
  }
  render() {
    const { item } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetailMovie', { item })}
        style={styles.container}>
        <View style={styles.above}>
          <View style={{ width: width * 0.8 }}><Text numberOfLines={1} style={styles.title}>{item.title}</Text></View>
          <View>
            {this.state.favourite === 0
              ?
              <TouchableOpacity
                onPress={() => this.setFavourite(item)}
              >
                <Image
                  style={styles.icon}
                  source={require('../../images/nonStar.png')}
                /></TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => { AlertRemoveFavourite(item), this.setState({ favourite: 0 }) }}
              >
                <Image
                  style={styles.icon}
                  source={require('../../images/fullStar.png')}
                />
              </TouchableOpacity>
            }
          </View>

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
function mapStateToProps(state) {
  return {
    isFavourite: state.isFavourite,
  }
}
export default connect(mapStateToProps)(FlatItem);

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
