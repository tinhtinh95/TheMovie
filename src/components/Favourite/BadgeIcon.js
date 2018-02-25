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

class BadgeIcon extends Component {
  render() {
    const { item } = this.props;
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require('../images/favourite.png')}
          style={[styles.icon, { tintColor: tintColor, margin: 5, padding: 5 }]}
        />
        <View style={{
          position: 'absolute',
          top: 1,
          right: 1,
          minWidth: 20,
          height: 20,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red'
        }}>
          <Text style={{ fontSize: 10, color: "white" }}>1</Text>
        </View>
        
      </View>
    );
  }
}

export default BadgeIcon;

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue'
  },
});





