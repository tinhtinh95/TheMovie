import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Button, TouchableOpacity, ScrollView, RefreshControl, AsyncStorage
} from 'react-native';
import FlatItem from './FlatItem';
const { height, width } = Dimensions.get('window');
import { connect } from "react-redux";
import { fetchData } from '../../actions/actions';
import Header from '../Header/Header';
import { deleteAllFavourites } from '../../databases/Schemas';

const uri = "https://image.tmdb.org/t/p/w185";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isRefresh: true,
      page: 1,
      isGridList: true,
      numColumns: 1,
      name: 'popular'
    }
   
  }

  _toggleGridList = () => {
    this.setState({ isGridList: !this.state.isGridList });
  }

  static navigationOptions = ({ navigation }) => {
    let header = (<Header navigation={navigation} titleHeader={'Popular'} />)
    return { header }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log(this.state.name)
    if (params !== undefined) {
      console.log(params)
      this.setState({name:params.name})
      this.props.fetchData(params.name, this.state.page);
    }else{
      console.log('k co')
      this.props.fetchData(this.state.name, this.state.page);
    }
    console.log(this.state.name)
    this.props.navigation.setParams({
      toggleGridList: this._toggleGridList,
    });

  }

  _onRefresh = (page) => {
    this.setState({ page: page + 1 });
    this.props.fetchData("popular", this.state.page);
  }


  render() {
    // console.log('params', params.name);
    // {params==='Popular' ? console.log('ahihi'): console.log('bibi')} 
    return (
      this.state.isGridList ?
        <View style={styles.container}>
          {/* <Button title="click to see" onPress={() => deleteAllFavourites().then().catch(e => alert(e))} /> */}
          <FlatList
            refreshing={false}
            onRefresh={() => this._onRefresh(this.state.page)}
            data={this.props.listPopular}
            keyExtractor={(item, index) => index}
            renderItem={({ item,index }) =>
              <FlatItem navigation={this.props.navigation} item={item}/>}
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

export default connect(mapStateToProps, { fetchData })(Home);


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
    alignContent: 'center'
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center',
    alignSelf: 'center'
  }
});
