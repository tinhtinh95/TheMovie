

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
import { insertNewFavourite, getFavouriteList, deleteFavourite } from './../../databases/Schemas';
import realm from './../../databases/Schemas';


const { height, width } = Dimensions.get('window');
const uri = "https://image.tmdb.org/t/p/w185";

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFavourite: [],
      favourite: 0,
      item: {}
    }
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    var check = false;
    const { item } = this.props;
    getFavouriteList()
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
        } else {
          this.setState({ favourite: 0 })
        }
      })
      .catch(err => console.log(err));
  }
  // componentDidMount(){
  //   const { item } = this.props;
  //   this.setState({ item: item });
  // }
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
            });
            this.setState({ favourite: 0 })
          }
        },
      ],
      { cancelable: false }
    )
  }
  setFavourite = (item) => {
    var check = false;
    getFavouriteList()
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
          this.AlertRemoveFavourite(item);
        } else {
          const newFavourite = {
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            overview: item.overview,
            release_date: item.release_date,
            poster_path: item.poster_path,
          };
          insertNewFavourite(newFavourite).then(
          ).catch((error) => {
            alert(`Insert new Favourite  error ${error}`);
          })
          this.setState({ favourite: 1 })
        }
      })
      .catch(err => console.log(err))
  }
  render() {
    const { favourite } = this.state;
    const { item } = this.props
    // alert(JSON.stringify(item))
    return (
      <TouchableOpacity
        onPress={() => this.setFavourite(item)}
      >
        {favourite === 0
          ?
          <Image
            style={styles.icon}
            source={require('../../images/nonStar.png')}
          />
          :
          <Image
            style={styles.icon}
            source={require('../../images/fullStar.png')}
          />
        }
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue'
  },
});