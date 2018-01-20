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
      isRefresh: true,
      page:1
    }
  }
  static navigationOptions = {
    header: {
      title: 'Popular'
    }
  };
  componentDidMount() {
    this.props.fetchData("popular",this.state.page);
    // this.setState({data:this.props.listPopular})
    alert(JSON.stringify(this.props.listPopular))
    // alert(JSON.stringify(this.state.data))
  }

  _onRefresh=(page)=>{
    this.setState({page:page+1});
    this.props.fetchData("popular",this.state.page);
  }

  render() {
    // alert(JSON.stringify(this.props.listPopular))
    return (
      <View style={styles.container}>
        <FlatList
         refreshing={false}
         onRefresh={()=>this._onRefresh(this.state.page)}
         initialNumToRender={10}
          data={this.props.listPopular}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <FlatItem item={item} />
          }
        ></FlatList>
      </View>
    );
  }
}

function mapStateToProps(state) {
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
