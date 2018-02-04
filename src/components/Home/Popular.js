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
  Image,
  Dimensions,
  FlatList,
  Button, TouchableOpacity, ScrollView, RefreshControl,AsyncStorage
} from 'react-native';
import FlatItem from './FlatItem';
const { height, width } = Dimensions.get('window');
import { connect } from "react-redux";
import { fetchData } from '../../actions/actions';
import Header from '../Header/Header';
import { deleteAllFavourites } from '../../databases/Schemas';


const uri = "https://image.tmdb.org/t/p/w185";

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isRefresh: true,
      page: 1,
      isGridList: true,
      numColumns: 1
    }
  }

  _toggleGridList = () => {
    this.setState({ isGridList: !this.state.isGridList });
  }

  static navigationOptions = ({ navigation }) => {
    let header = (<Header navigation={navigation} titleHeader={'Popular'} />)
    return { header }
  }

  componentWillMount() {
    this.props.fetchData("popular", this.state.page);
    this.props.navigation.setParams({
      toggleGridList: this._toggleGridList,
    });

  }

  _onRefresh = (page) => {
    this.setState({ page: page + 1 });
    this.props.fetchData("popular", this.state.page);
  }


  render() {
    return (
      this.state.isGridList ?
        <View style={styles.container}>
         <Button title="click to see" onPress={() => deleteAllFavourites().then().catch(e => alert(e))} />
          <FlatList
            refreshing={false}
            onRefresh={() => this._onRefresh(this.state.page)}
            data={this.props.listPopular}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
              <FlatItem navigation={this.props.navigation} item={item} />}
          /></View>
        :
        <ScrollView
        
        refreshControl={
          <RefreshControl
          refreshing={false}
          onRefresh={() => this._onRefresh(this.state.page)}
          />
      }
        >
          <View style={styles.wrapperItems}>
            {this.props.listPopular.map(e => (
              <TouchableOpacity key={e.id}
                style={styles.wrapperItem}
                onPress={() => this.props.navigation.navigate('DetailMovie', { item: e })}
              >
                <View>
                  <Image
                    style={{ width: width / 2 - 20, height: height / 3 }}
                    source={{ uri: `${uri}${e.poster_path}` }}
                  />
                  <Text style={styles.text}>{e.title}</Text>
                </View>

              </TouchableOpacity>))}
          </View>
        </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    listPopular: state.movies,
  }
}

export default connect(mapStateToProps, { fetchData })(Popular);


const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },

  wrapperItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10,
  },
  wrapperItem: {
    width: width / 2 - 20,
    shadowColor: "#2e272b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    alignContent:'center'
  },
  text:{
    fontSize:17, 
    fontWeight:'bold',
     alignContent:'center',
     alignSelf:'center'
     }
});
