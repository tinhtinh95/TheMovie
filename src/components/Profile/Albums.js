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
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  CameraRoll
} from 'react-native';
import RadioButton from 'radio-button-react-native';


export default class Albums extends Component {

  constructor(props){
    super(props);
    this.state={
      photos:[]
    }
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };
 render() {
  return (
    <View>
      <Button title="Load Images" onPress={this._handleButtonPress} />
      <ScrollView>
        {this.state.photos.map((p, i) => {
        return (
          <Image
            key={i}
            style={{
              width: 300,
              height: 100,
            }}
            source={{ uri: p.node.image.uri }}
          />
        );
      })}
      </ScrollView>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
