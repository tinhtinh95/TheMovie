

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
import { toggleFav } from '../../actions/actions';
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

  }
  reloadData = () => {
    var check = false;
    const { item } = this.props;
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
          this.setState({ favourite: 1 })
        } else {
          this.setState({ favourite: 0 })

        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount(){
    this.forceUpdate()
  }

  // componentWillMount(){
  //   this.reloadData();
  //   realm.addListener('change', () => {
  //     this.reloadData();
  //   });
  // }
  // componentWillUnmount(){
  //   realm.removeListener('change', () => {
  //     this.reloadData();
  //   });
  // }

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
    // let check=checkObject(item,"FAVOURITE");
    // console.log('check o day ', check);
    // if (checkObject(item,"FAVOURITE")) {
    //   AlertRemoveFavourite(item);
    // } else {
    //   const newFavourite = {
    //     id: item.id,
    //     title: item.title,
    //     vote_average: item.vote_average,
    //     overview: item.overview,
    //     release_date: item.release_date,
    //     poster_path: item.poster_path,
    //   };
    //   //  this.props.addFavourite(newFavourite)
    //   insertNewFavourite(newFavourite).then(
    //   ).catch((error) => {
    //     alert(`Insert new Favourite  error ${error}`);
    //   })
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
          })
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
const mapStateToProps = (state) => {
  return {
    isFavourite: state.isFavourite
  }
}

export default connect(mapStateToProps, { toggleFav })(Icon);
// export default (Icon); 


const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: 'blue'
  },
});