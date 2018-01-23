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
import {connect} from 'react-redux';


const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";

class FlatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFavourite: [],
      favourite: 0,
    }
  }

  setFavourite = async (item) => {
    console.log('truoc')
    // let listNew=[];
    // listNew = this.state.listFavourite.concat(item );
    // console.log(listNew)
    // this.setState({ listFavourite: this.state.listFavourite.concat(item), favourite: 1 });
    // console.log(this.state.listFavourite);
    var listFavourite=[];
    listFavourite = this.props.listFavourite.concat(item);
    // console.log(this.props.listFavourite);
    try {
      await AsyncStorage.setItem('@MyListFavourite',JSON.stringify(listFavourite));
      console.log('sau');
    } catch (error) {
      // Error saving data
    }
  }

  

  render() {
    const { item } = this.props;
    // console.log(this.props.listFavourite);
    return (
      <TouchableOpacity 
      onPress={()=>this.props.navigation.navigate('DetailMovie1', {item})}
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
function mapStateToProps(state){
  return{
    listFavourite: state.listFavourite,
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
