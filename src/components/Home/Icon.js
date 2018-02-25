

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
import { connect } from 'react-redux';
import { toggleFav, addFavourite } from '../../actions/actions';
import { AlertRemoveFavourite, setFavourite } from './../../actions/model';

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
    // const { item } = this.props;
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

  // AlertRemoveFavourite = (item) => {
  //   Alert.alert(
  //     'Warning',
  //     'Do you want to delete this favourite film',
  //     [
  //       {
  //         text: 'Cancel', onPress: () => console.log('Cancel')
  //         , style: 'cancel'
  //       },
  //       {
  //         text: 'OK', onPress: () => {
  //           deleteFavourite(item.id).then().catch(error => {
  //             alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
  //           });
  //         }
  //       },
  //     ],
  //     { cancelable: false }
  //   )
  // }
  setFavourite = (item) => {
    // const newFavourite = {
    //   id: item.id,
    //   title: item.title,
    //   vote_average: item.vote_average,
    //   overview: item.overview,
    //   release_date: item.release_date,
    //   poster_path: item.poster_path,
    // };
    // if (this.props.isFavorite) {
    //   Alert.alert(
    //     'Warning',
    //     'Are you sure you want to unfavorite this item?',
    //     [
    //       {
    //         text: 'Cancel', onPress: () => console.log('Cancel')
    //         , style: 'cancel'
    //       },
    //       {
    //         text: 'OK', onPress: () => {
    //           // deleteFavourite(item.id).then().catch(error => {
    //           //   alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
    //           // })
    //           this.props.addFavourite(newFavourite);
    //           //  deleteFavourite(newFavourite.id).then().catch(error => {
    //           //   alert(`Failed to delete Favourite with id = ${newFavourite.id}, error=${error}`);
    //           // })
    //         }
    //       },
    //     ],
    //     { cancelable: false }
    //   ) 
    // }
    // else {
    //   this.props.addFavourite(newFavourite);
    // }

    var check = false;
    getTableList('FAVOURITE')
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
          //  this.props.addFavourite(newFavourite)
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
        // {!this.props.isFavorite
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
const mapStateToProps = (state, props) => {
  const { item } = props;
  return {
    isFavorite: state.listFavourite
      .map(movie => { return movie.id })
      .indexOf(item.id) != -1 ? true : false,
  }
}

export default connect(mapStateToProps, {addFavourite })(Icon);
// export default (Icon); 


const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue'
  },
});