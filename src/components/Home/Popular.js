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
  Button
} from 'react-native';
import FlatItem from './FlatItem';
const { height, width } = Dimensions.get('window');
import { connect } from "react-redux";
import { fetchData } from '../../actions/actions';

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  static navigationOptions = {
    header: {
      title: 'Popular'
    }
  };
  componentDidMount() {
    // console.log(this.props.listPopular);
    this.props.fetchData();
    console.log(this.props.listPopular);
    // return (
    //   fetch('https://api.themoviedb.org/3/movie/popular?api_key=0267c13d8c7d1dcddb40001ba6372235')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       this.setState({ data: responseJson.results })
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     })
    // )
  }

  render() {
    console.log(this.props.listPopular);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.listPopular}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <FlatItem item={item} />
          }

        />
<Button onPress={this.props.fetchData()} title="nhap"></Button>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state',state);
   return {
     listPopular: state,
     }
}

export default connect(mapStateToProps, { fetchData })(Popular);


const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },

});
