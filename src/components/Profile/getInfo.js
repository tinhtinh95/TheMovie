import { AsyncStorage } from 'react-native';

const getInfo = async () => {
    try {
      // await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('@MyProfile');
      if (value !== null) {
        var myInfo = JSON.parse(value);
        // console.log(myInfo.avatar.uri)
        return myInfo;
      } else {
        console.log('dont have data');
        return [];
      }
    } catch (error) {
      return [];
    }
  }
  export default getInfo;