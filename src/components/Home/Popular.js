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
  Button, TouchableOpacity
} from 'react-native';
import FlatItem from './FlatItem';
// import FlatItemGrid from './FlatItemGrid';
const { height, width } = Dimensions.get('window');
import { connect } from "react-redux";
import { fetchData } from '../../actions/actions';
import Header from '../Header/Header'

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isRefresh: true,
      page: 1,
      isGridList: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    let header = (<Header navigation={navigation} titleHeader={'Popular'} />)
    return { header }
  }

  componentDidMount() {
    this.props.fetchData("popular", this.state.page);
  }

  _onRefresh = (page) => {
    this.setState({ page: page + 1 });
    this.props.fetchData("popular", this.state.page);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={false}
          onRefresh={() => this._onRefresh(this.state.page)}
          initialNumToRender={10}
          data={this.props.listPopular}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) =>
            // this.state.isGridList ?
              <FlatItem navigation={this.props.navigation} item={item} />
              // : <FlatItemGrid navigation={this.props.navigation} item={item} />
          }
        ></FlatList>
      </View>
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

  containerHeader: {

    alignItems: 'center',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(90,100,174)',
  },
  icon: {
    margin: 10,
    width: 26,
    height: 26,
    tintColor: 'white'
  },
});
