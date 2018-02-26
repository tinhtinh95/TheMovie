import { deleteFavourite } from "../databases/Schemas";
import { deleteReminder } from './../databases/Schemas';
import { Alert } from 'react-native';

export const AlertRemoveFavourite = (item) => {
  Alert.alert(
    'Warning',
    'Do you want to delete this favourite film',
    [
      {
        text: 'Cancel', onPress: () => {
           console.log('Cancel');
        }
        , style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
           deleteFavourite(item.id).then().catch(error => {
            alert(`Failed to delete Favourite with id = ${id}, error=${error}`);
          });
        }
      },
    ],
    { cancelable: false }
  )
}
export const AlertRemoveReminder = (item) => {
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
          deleteReminder(item.id).then().catch(error => {
            alert(`Failed to delete Favourite with id = ${item.id}, error=${error}`);
          })
        }
      },
    ],
    { cancelable: false }
  )
}
