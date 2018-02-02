import {AsyncStorage,Alert} from 'react-native';


export const getFavourite = async () => {
    try {
        const value = await AsyncStorage.getItem('@MyListFavourite');
        if (value !== null) {
            return JSON.parse(value);
        } else {
            console.log('dont have data');
            return [];
        }
    } catch (error) {
        return [];
    }
}

export const removeFavourite = async (item) => {
    var listNew = []
    await getFavourite()
        .then(list => {
            console.log(list)
            if (item.favourite) {
                console.log(item.favourite)
                list = list.filter(
                    function (e) {
                        return e.id !== item.id;
                    })
                listNew = list;
            }
        })
    // await console.log(listNew);
    await AsyncStorage.setItem('@MyListFavourite', JSON.stringify(listNew));
}
export const AlertRemoveFavourite = (item) => {
    Alert.alert(
      'Warning',
      'Do you want to delete this favourite film',
      [
        {
          text: 'Cancel', onPress: () => console.log('Cancel')
          , style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            removeFavourite(item);
          }
        },
      ],
      { cancelable: false }
    )
  }
