

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
// import { AlertRemoveFavourite } from '../../actions/favourite';
import { insertNewFavourite, getFavouriteList,deleteFavourite } from './../../databases/Schemas';
import realm from './../../databases/Schemas';


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
    this.reloadData();
    realm.addListener('change', () => {
        this.reloadData();
    });
  }
  reloadData=()=> {
    var check=false;
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
        if(check){
          this.setState({favourite:1})
        }else{
          this.setState({favourite:0})
        }
      })
      .catch(err=>console.log(err));
  }
  componentDidMount(){
    const { item } = this.props;
    this.setState({ item: item });
  }
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
    const {favourite } = this.state;
    const {item} =this.props
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('DetailMovie', { item })}
        style={styles.container}>
        <View style={styles.above}>
          <View style={{ width: width * 0.8 }}><Text numberOfLines={1} style={styles.title}>{item.title}</Text></View>
          <View>
            <TouchableOpacity
              onPress={() =>  this.setFavourite(item)}
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

export default FlatItem;

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