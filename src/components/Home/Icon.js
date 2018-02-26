

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
import { insertNewFavourite, deleteFavourite, checkObject, getTableList } from './../../databases/Schemas';
import realm from './../../databases/Schemas';
import { AlertRemoveFavourite,  } from './../../actions/model';

const { height, width } = Dimensions.get('window');

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: 0,
    }
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    var check = false;
    const { item } = this.props;
    getTableList('FAVOURITE')
      .then(async(res) => {
        let list = await res.map(item=>{
          return {
           id: item.id,
           title: item.title,
           vote_average: item.vote_average,
           overview: item.overview,
           release_date: item.release_date,
           poster_path: item.poster_path,
          }
        })
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
  setFavourite = (item) => {
    var check = false;
    getTableList('FAVOURITE')
      .then((list) => {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === item.id) {
            check = true;
            break;
          } else {
            check = false;
          }
        }
        if (check) {
          AlertRemoveFavourite(item);
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
          });
        }
      })
      .catch(err => console.log(err))
  }
  render() {
    const { favourite } = this.state;
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
          this.setFavourite(item)
        }
        }
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
export default (Icon); 
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue'
  },
});