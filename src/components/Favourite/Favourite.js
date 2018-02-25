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
import { getTableList } from './../../databases/Schemas';
import realm from './../../databases/Schemas';
import Search from 'react-native-search-box';
import { getFavourite } from '../../actions/actions'

const { width, height } = Dimensions.get('window');

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      listFavourite: [],
      copyListFavourite: [],
    }
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
    getTableList('FAVOURITE')
      .then(async(res) => {
         let listFavourite = await res.map(item=>{
           return {
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            overview: item.overview,
            release_date: item.release_date,
            poster_path: item.poster_path,
           }
         })
        // this.props.getFavourite(listFavourite);
        this.setState({ listFavourite, copyListFavourite: listFavourite })
      })
      .catch(err => {
        this.setState({ listFavourite: [] })
        alert(`Error${err}`)
      })
  }
  _onCancel = () => {
    listFavourite = this.state.copyListFavourite;
    this.setState({
      listFavourite
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: width, height: 50 }}>
          <Search
            heightAdjust={40}
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
            onCancel={this._onCancel}
            onDelete={this._onCancel}
          />
        </View>
        <FlatList
          data=
          // {this.props.listFavourite}
          {this.state.listFavourite}
          keyExtractor={(item,index) => item.id}
          renderItem={({ item }) => <FavouriteItem navigation={this.props.navigation} item={item} />
          }
        ></FlatList>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    listFavourite: state.listFavourite,
  }
}

export default connect(mapStateToProps, { getFavourite })(Favourite);
// export default (Favourite);

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
