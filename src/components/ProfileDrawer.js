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
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import TabMain from './TabMain';
import EditProfile from './Profile/EditProfile';

const { height, width } = Dimensions.get('window');

const DrawerConfigure = DrawerNavigator({
  Home: {
    screen: TabMain,
  },
  EditProfile: {
    screen: EditProfile
  }
},
  {
    drawerBackgroundColor: '#b7ffef',
    drawerWidth: width * 0.9,
    useNativeAnimations: true,
    contentComponent: (props) => (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={require('../images/smile.png')}
          />   
        </TouchableOpacity>
        <Text style={styles.textName}>Tina</Text>
        <View style={styles.infor}>
          <Image
            style={styles.imageInfor}
            source={require('../images/birthdayCake.png')}
          />
          <Text style={styles.fontText}>1995-12-07</Text>
        </View>
        <View style={styles.infor}>
          <Image
            style={styles.imageInfor}
            source={require('../images/mail.png')}
          />
          <Text style={styles.fontText}>nttinh995@gmail.com</Text>
        </View>
        <View style={styles.infor}>
          <Image
             style={styles.imageInfor}
            source={require('../images/male.png')}
          />
          <Text style={styles.fontText}>Female</Text>
        </View>
        <TouchableOpacity
          onPress={() => { props.navigation.navigate('EditProfile') }}
          style={styles.btnEdit}>
          <Text style={styles.txtEdit}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.txtReminder}>Reminder List:</Text>
        <FlatList
        // data={this.props.data}
        // extraData={this.state}
        // keyExtractor={this._keyExtractor}
        // renderItem={this._renderItem}
        />
        <View style={{
          backgroundColor: '#4dbebb',
          padding: 7,
          marginBottom: 20
        }}>
          <Text style={{ fontSize: 20 }}>Reminder List:</Text>
          <Text style={{ fontSize: 20 }}>Reminder List:</Text>
        </View>
        <TouchableOpacity 
        onPress={()=>props.navigation.navigate('Setting')}
        style={styles.btnShowAll}>
          <Text style={styles.txtEdit}>Show All</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15 ,alignSelf:'center' }}>CopyRight@Enclave 2017</Text>


        {/* <DrawerItems
            {...props}
            getLabel={(scene) => (
              <View style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'pink',
                padding: 10,
                margin: 10,
                width: '90%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={styles.buttonText}>{props.getLabel(scene)}</Text>
              </View>
            )}
          /> */}
      </ScrollView>
    )
  })


export default DrawerConfigure;

// export default class ProfileDrawer extends Component {
//   render() {
//     return (
//       <DrawerConfigure />
//     );
//   }
// }

const styles = StyleSheet.create({
container:{
   marginTop: 40, 
   padding: 10 
  },
avatar:{ 
  alignSelf:'center'
},
avatarImage:{ 
  height: 150, 
  width: 150
 },
 textName:{
  fontSize: 25,
  margin: 15,
  alignSelf:'center'
},
infor:{
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 15,
},
imageInfor:{
  height: 26,
  width: 26,
  marginRight: 20
},
fontText:{
  fontSize:17
},
btnEdit:{
  backgroundColor: 'rgb(90,100,174)',
  padding: 5,
  borderRadius: 5,
  width: 80,
  alignItems: 'center',
  alignSelf:'center'
},
txtEdit:{ 
  fontSize: 15 ,
  color:'white',
  fontWeight:'bold'}
,
txtReminder:{ 
  fontSize: 25, 
  fontWeight: 'bold', 
  margin: 14 
},
btnShowAll:{
  backgroundColor: 'rgb(90,100,174)',
  padding: 5,
  borderRadius: 5,
  width: 80,
  alignItems: 'center',
  alignSelf:'center',
  marginBottom:5
}

});
