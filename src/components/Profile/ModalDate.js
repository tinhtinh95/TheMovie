// import React, { Component } from 'react';
// import { Text, View, Button, Modal, StyleSheet,DatePickerIOS , Dimensions} from 'react-native';


// const {width, height}=Dimensions.get('window');

// export default class ModalDate extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             modalVisible: false,
//             chosenDate: new Date(),
//         }
//         this.setDate = this.setDate.bind(this);
//       }
//   setDate(newDate) {
//     this.setState({chosenDate: newDate})
//   }
//   openModal() {
//     this.setState({modalVisible:true});
//   }

//   closeModal() {
//     this.setState({modalVisible:false});
//   }

//   render() {
//     return (
//         <View style={styles.container}>
//           <Modal
//               visible={this.state.modalVisible}
//               animationType={'slide'}
//               onRequestClose={() => this.closeModal()}
//           >
//             <View style={styles.modalContainer}>
//               {/* <View style={styles.innerContainer}> */}
//               <DatePickerIOS
//           style={{flex:1}}
//           date={this.state.chosenDate}
//           onDateChange={this.setDate}/>
//                 <Button
//                     onPress={() => this.closeModal()}
//                     title="Close modal"
//                 >
//                 </Button>
//               {/* </View> */}
//             </View>
//           </Modal>
//           <Button
//               onPress={() => this.openModal()}
//               title="Open modal"
//           />
//         </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     height: height/2,
//     alignItems:'center'
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   innerContainer: {
//     alignItems: 'center',
//   },
// });
