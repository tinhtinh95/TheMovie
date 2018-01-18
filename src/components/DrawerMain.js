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
  Image
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import StackMain from './StackMain';
import TabMain from './TabMain';


const DrawerConfigure = DrawerNavigator({
  Home: {
    screen: StackMain,
    // screen: TabMain,
  }
},
  {
    drawerBackgroundColor: '#34B080',
    useNativeAnimations: true,
    contentComponent: (props) => (
      <View style={{ marginTop: 100, }}>
        <ScrollView>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../images/user.png')}
            />
          </TouchableOpacity>
          <Text>Tina</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}> 
            <Image
            style={{height:26, width:26, marginRight:20}}
              source={require('../images/birthdayCake.png')}
            />
            <Text>1995-12-07</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}> 
            <Image
            style={{height:26, width:26, marginRight:20}}
              source={require('../images/mail.png')}
            />
            <Text>nttinh995@gmail.com</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}> 
            <Image
            style={{height:26, width:26, marginRight:20}}
              source={require('../images/male.png')}
            />
            <Text>Female</Text>
          </View>
          <TouchableOpacity style={{backgroundColor:'rgb(90,100,174)'}}>
            <Text>Edit</Text>
          </TouchableOpacity>
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
      </View>
    )
  })


export default class DrawerMain extends Component {
  render() {
    return (
      <DrawerConfigure />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
