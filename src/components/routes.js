import StackConfigure from './Favourite/Favourite';
import About from './About/About';
import EditProfile from './Profile/EditProfile';
import Settings from './Settings/Settings';
import Reminder from './Settings/Reminder';
import Favourite from './Favourite/Favourite';
import DetailMovie from './Home/DetailMovie';
import Home from './Home/Home';
import Header from './Header/Header';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Dimensions, Image, StyleSheet,View,Platform,Text } from 'react-native';
import React, { Component } from 'react';
import ProfileDrawer from './ProfileDrawer';
import Splash from './SplashScreen';
import IconBadge from 'react-native-icon-badge';
import BadgeIcon from './Favourite/BadgeIcon';

const { width, height } = Dimensions.get('window');

const SettingConfigure = StackNavigator({
  Settings: { screen: Settings },
  Reminder: { screen: Reminder },
})
const FavouriteConfigure = StackNavigator({
  Favourite: {
    screen: Favourite,
  },
  DetailMovie: {
    screen: DetailMovie,
  }
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
        
        // <Image
        //   source={require('../images/favourite.png')}
        //   style={[styles.icon, { tintColor: tintColor }]}
        // />
       <BadgeIcon />
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
      activeTintColor: '#287b6a',
      inactiveTintColor: 'gray',
      upperCaseLabel: false,
      style: {
      // borderTopWidth: 1,
      borderColor: 'gray',
        // backgroundColor: 'rgb(90,100,174)',
        backgroundColor: 'white'
      },
      showIcon: true,
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
    drawerBackgroundColor: 'white',
    drawerWidth: width * 0.9,
    useNativeAnimations: true,
    contentComponent: ({ navigation }) => <ProfileDrawer navigation={navigation} />
  })

export default Main = StackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  DrawerConfigure: {
    screen: DrawerConfigure,
    navigationOptions: {
      header: null
    }
  }
})


const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});