import { deleteAllFavourites } from "../databases/Schemas";
import { deleteReminder } from './../databases/Schemas';

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
            deleteFavourite(item.id).then().catch(error => {
              alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  export const AlertRemoveReminder = (id) => {
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
            deleteReminder(id).then().catch(error => {
              alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
            })
          }
        },
      ],
      { cancelable: false }
    )
  }