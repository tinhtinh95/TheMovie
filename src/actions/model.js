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
// export const setFavourite = (item) => {
//   var check = false;
//   getFavouriteList()
//     .then(list => {
//       for (var i = 0; i < list.length; i++) {
//         if (list[i].id === item.id) {
//           check = true;
//           break;
//         } else {
//           check = false;
//         }
//       }
//       if (check) {
//         AlertRemoveFavourite(item);
//       } else {
//         const newFavourite = {
//           id: item.id,
//           title: item.title,
//           vote_average: item.vote_average,
//           overview: item.overview,
//           release_date: item.release_date,
//           poster_path: item.poster_path,
//         };
//         //  this.props.addFavourite(newFavourite)
//         insertNewFavourite(newFavourite).then(
//         ).catch((error) => {
//           alert(`Insert new Favourite  error ${error}`);
//         })
//       }
//     })
//     .catch(err => console.log(err))
// }

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
