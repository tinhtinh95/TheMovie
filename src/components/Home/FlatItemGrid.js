// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   Button
// } from 'react-native';
// import { AsyncStorage } from 'react-native';
// import {connect} from 'react-redux';


// const { height, width } = Dimensions.get('window');
// const uri = "https://image.tmdb.org/t/p/w185";

// class FlatItemGrid extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       listFavourite: [],
//       favourite: 0,

//     }
//   }

//   setFavourite = async (item) => {
//     console.log('truoc')
//     // let listNew=[];
//     // listNew = this.state.listFavourite.concat(item );
//     // console.log(listNew)
//     // this.setState({ listFavourite: this.state.listFavourite.concat(item), favourite: 1 });
//     // console.log(this.state.listFavourite);
//     var listFavourite=[];
//     listFavourite = this.props.listFavourite.concat(item);
//     // console.log(this.props.listFavourite);
//     try {
//       await AsyncStorage.setItem('@MyListFavourite',JSON.stringify(listFavourite));
//       console.log('sau');
//     } catch (error) {
//       // Error saving data
//     }
//   }

  

//   render() {
//     const { item } = this.props;
//     // console.log(this.props.listFavourite);
//     return (
//       <TouchableOpacity style={{ paddingg: 10, flexWrap: 'wrap', height: height / 2 }}>
//       <Image
//         source={{ uri: `${uri}${item.poster_path}` }}
//         style={{ width: width / 2 - 30, height: height / 2 - 40 }}
//       ></Image>
//       <Text style={{margin:10, alignContent:'center'}}>{item.title}</Text>

//     </TouchableOpacity>
//     );
//   }
// }
// function mapStateToProps(state){
//   return{
//     listFavourite: state.listFavourite,
//   }
// }
// export default connect(mapStateToProps)(FlatItem);

// const styles = StyleSheet.create({
 

// });
