import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  FlatList,
  TextInput,
  Dimensions
} from 'react-native';
import FavouriteItem from './FavouriteItem';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import DetailMovie from '../Home/DetailMovie';
import Header from '../Header/Header';
import { StackNavigator } from 'react-navigation';
import { getFavouriteList } from './../../databases/Schemas';
import realm from './../../databases/Schemas';
import Search from 'react-native-search-box';
import SearchBar from 'react-native-search-bar'

const { width, height } = Dimensions.get('window');

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      listFavourite: [],
      copyListFavourite: [],
    },

      this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  static navigationOptions = ({ navigation }) => {
    let header = (<Header navigation={navigation} titleHeader={'Favourite'} />)
    return { header }
  }

  reloadData = () => {
    getFavouriteList()
      .then(listFavourite => {
        this.setState({ listFavourite, copyListFavourite: listFavourite })
      })
      .catch(err => {
        this.setState({ listFavourite: [] })
        alert(`Error${err}`)
      })
  }

  static navigationOptions = {
    tabBarLabel: 'Favourites',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/favourite.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: width }}>
          <Search
            backgroundColor='lightblue'
            ref="search_box"
            onChangeText={(text) => {
              listFavourite = this.state.copyListFavourite.filter(e =>
                (e.title.toUpperCase().indexOf(text.toUpperCase()) != -1)
              )
              this.setState({
                listFavourite
              })
            }}
            onCancel={() => {
              listFavourite = this.state.copyListFavourite;
              this.setState({
                listFavourite
              })
            }}
            onDelete={() => {
             listFavourite = this.state.copyListFavourite;
              this.setState({
                listFavourite
              })
          }}
          />
        </View>
        <FlatList
          //  refreshing={false}
          //  onRefresh={()=>this._onRefresh(this.state.page)}
          data={this.state.listFavourite}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <FavouriteItem item={item} />
          }
        ></FlatList>
      </View>
    );
  }
}
const StackConfigure = StackNavigator({
  Favourite: {
    screen: Favourite,
  },
  DetailMovie: {
    screen: DetailMovie,
  }
}, {

  })

export default StackConfigure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
