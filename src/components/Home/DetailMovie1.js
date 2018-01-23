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
  Button, ScrollView, FlatList, KeyboardAvoidingView
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
      listCast: []
    }
  }

  static navigationOptions = {
    title: 'DetailMovie',
  }


  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log('params: ', params.item.id);
    fetch(`https://api.themoviedb.org/3/movie/${params.item.id}/credits?api_key=0267c13d8c7d1dcddb40001ba6372235`)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson.cast);
        this.setState({ listCast: resJson.cast })
      })
      .catch(err => console.log(err))
  }

  // listCast = (id) => {
  //   fetch(`https://api.themoviedb.org/3/movie/${id}/credits`)
  //     .then(res => res.json())
  //     .then(resJson => {
  //       console.log(resJson.cast);
  //       this.setState({ listCast: resJson.cast })
  //     })
  //     .catch(err => console.log(err))
  // }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.above}>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={require('../../images/nonStar.png')} />
          </TouchableOpacity>
          <View style={{ paddingTop: 10 }}>
            <View style={styles.mainRight}>
              <Text style={styles.text}> Release date: </Text>
              <Text style={styles.textRed}> {params.item.release_date} </Text>
            </View>
            <View style={styles.mainRight}>
              <Text style={styles.text}> Release date: </Text>
              <Text style={styles.textRed}> {params.item.vote_average}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.bellow, { padding: 10, paddingTop: 0, height:height/2.5}]}>
          <View style={{ marginRight: 10, marginBottom:10}}>
            <Image style={{ width: width * 0.44, height: height * 0.27, marginBottom: 10 }}
              source={{ uri: `${uri}${params.item.poster_path}` }}
            >
            </Image>
            <TouchableOpacity style={{
              borderRadius: 5,
              backgroundColor: '#b00060',
              padding: 5,
              width: width * 0.37,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}>
              <Text style={[styles.text, { color: 'white' }]}>REMINDER</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={styles.textRed}>Overview:</Text>
            <Text style={styles.text}>{params.item.overview}</Text>
          </ScrollView>
        </View>
        <View style={{marginBottom:height*0.15}}>
          <Text style={{ marginBottom:10,fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>Cast & Crew</Text>
          <FlatList
            horizontal={true}
            data={this.state.listCast}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>//<Text>{item.profile_path}</Text>
              <View style={{ width: width * 0.24, height: height * 0.35,marginRight:7 }}>
                <Image
                source={{uri:`${uri}${item.profile_path}`}}
                style={{ width: width * 0.24, height: height * 0.15 }}
              />
              <Text style={{alignSelf:'center'}}>{item.name}</Text>
              </View>
            }
          />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1,
    // borderColor: '#4bcb4d',
    // padding: 10,

    // paddingBottom: 10
  },
  above: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue',
    margin: 20
  },
  bellow: {
    // marginTop: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainRight: {
    marginBottom: 10,
    flexDirection: 'row',

  },
  text: {
    fontSize: 16
  },
  textRed: {
    color: 'red',
    fontSize: 16
  }

});
