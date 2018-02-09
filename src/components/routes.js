import StackConfigure from './Favourite/Favourite';
import About from './About/About';
import EditProfile from './Profile/EditProfile';
import Filter from './Settings/Filter';
import Reminder from './Settings/Reminder';
import Favourite from './Favourite/Favourite';
import DetailMovie from './Home/DetailMovie';
import Home from './Home/Home';
import Header from './Header/Header';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Dimensions, Image, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import ProfileOptions from './ProfileOptions';

const { width, height } = Dimensions.get('window');

const SettingConfigure = StackNavigator({
  Filter: { screen: Filter },
  Reminder: { screen: Reminder },
})
const FavouriteConfigure = StackNavigator({
  Favourite: {
    screen: Favourite,
  },
  DetailMovie: {
    screen: DetailMovie,
  }
},{
  navigationOptions :({ navigation }) => <Header navigation={navigation} titleHeader={'Favourite'} />
})
const HomeConfig = StackNavigator({
  Home: {
    screen: Home,
  },
  DetailMovie: {
    screen: DetailMovie,
  }
}
)
const TabMain = TabNavigator({
  Home: {
    screen: HomeConfig,
    navigationOptions: {
      tabBarLabel: 'Movies',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/home.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    }
  },
  Favourite: {
    screen: FavouriteConfigure,
    navigationOptions: {
      tabBarLabel: 'Favourites',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/favourite.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    }
  },
  Setting: {
    screen: SettingConfigure,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/setting.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    }
  },
  About: {
    screen: About,
  }
},
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'black',
      style: {
        backgroundColor: 'white',
      },
    },
  }
)

const DrawerConfigure = DrawerNavigator({
  Home: {
    screen: TabMain,
  },
  EditProfile: {
    screen: EditProfile
  }
},
  {
    drawerBackgroundColor: '#ADD8E6',
    drawerWidth: width * 0.9,
    useNativeAnimations: true,
    contentComponent: ({ navigation }) => <ProfileOptions navigation={navigation} />
  })

export default DrawerConfigure;


const styles = StyleSheet.create({

  icon: {
    margin: 10,
    width: 26,
    height: 26,
    tintColor: 'white'
  },
});