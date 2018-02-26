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
import { getTableList } from '../../databases/Schemas';
const { height, width } = Dimensions.get('window');
import realm from '../../databases/Schemas';

class BadgeIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    }
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    getTableList('FAVOURITE')
      .then(async (res) => {
        let listFavourite = await res.map(item => {
          return {
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            overview: item.overview,
            release_date: item.release_date,
            poster_path: item.poster_path,
          }
        })
        let count = listFavourite.length;
        await this.setState({ number: count })
      })
      .catch(err => {
        this.setState({ number: 0 })
        alert(`Error${err}`)
      })
  }
  render() {
    const { tintColor } = this.props;
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require('../../images/favourite.png')}
          style={[styles.icon, { tintColor: tintColor, margin: 5, padding: 5 }]}
        />
        {this.state.number != 0 ?
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
            <Text style={{ fontSize: 10, color: "white" }}>{this.state.number}</Text>
          </View>
          :
          <View></View>
        }
      </View>

    );
  }
}

export default BadgeIcon;

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});





