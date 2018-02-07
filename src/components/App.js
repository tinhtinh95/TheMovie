import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import ProfileDrawer from './ProfileDrawer';
import {Provider} from 'react-redux';
import store from '../reducer/configureStore';


export default class App extends Component {
  componentWillMount(){
    StatusBar.setHidden(true);
  }
  render() {
    return (
        <Provider store={store}>
          <ProfileDrawer/>
        </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00e640',
  },

});
// import React, { PureComponent } from 'react';
// import { TouchableHightLight, Text, View, FlatList } from 'react-native';
// import Search from 'react-native-search-box';

// const rowHeight = 40;

// export default class MyScene extends PureComponent {

//   state = {
//     data: [
//       {
//         "name": "Anh Tuan Nguyen",
//         "age": 28
//       },
//       {
//         "name": "An Nhien",
//         "age": 2
//       },
//       {
//         "name": "Thanh Tu Pham",
//         "age": 32
//       },
//       {
//         "name": "Tien Thanh",
//         "age": 24
//       },
//     ],
//     list: [
//       {
//         "name": "Anh Tuan Nguyen",
//         "age": 28
//       },
//       {
//         "name": "An Nhien",
//         "age": 2
//       },
//       {
//         "name": "Thanh Tu Pham",
//         "age": 32
//       },
//       {
//         "name": "Tien Thanh",
//         "age": 24
//       },
//     ],
//   }

//   renderRow = (item, sectionId, index) => {
//     return (
//       <TouchableHightLight
//         style={{
//           height: rowHeight,
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Text>{item.name}</Text>
//       </TouchableHightLight>
//     );
//   }

//   // Important: You must return a Promise
//   beforeFocus = () => {
//     return new Promise((resolve, reject) => {
//       console.log('beforeFocus');
//       resolve();
//     });
//   }

//   // Important: You must return a Promise
//   onFocus = (text) => {
//     return new Promise((resolve, reject) => {
//       console.log('onFocus', text);
//       resolve();
//     });
//   }

//   // Important: You must return a Promise
//   afterFocus = () => {
//     return new Promise((resolve, reject) => {
//       console.log('afterFocus');
//       resolve();
//     });
//   }

//   render() {
//     // inside your render function
//     return (
//       <View style={{ flex: 1 }}>
//         <Search
//           backgroundColor='lightblue'
//           ref="search_box"
//           onChangeText={(text) => {
//             list = this.state.data.filter(e =>
//               (e.name.indexOf(text) != -1)
//             )
//             this.setState({
//               list: list
//             })
//           }}
//         />
//         <FlatList
//           data={this.state.list}
//           keyExtractor={(item, index) => index}
//           renderItem={({ item }) => <Text>{item.name}</Text>
//           }
//         />
//       </View>
//     );
//   }
// }
