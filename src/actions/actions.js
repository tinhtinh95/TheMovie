import * as types from './actionTypes';
import API from '../api/api';

function getPopular(data) {
    return {
        type: types.GET_POPULAR,
        payload: data,

    }
}
export function fetchData(name, page) {
    return (dispatch) => {
        API.getList(name, page).then((data) => {
            if (name === 'popular') {
                // alert(page)
                dispatch(getPopular(data));
                // } else if (name === 'product') {
                //     dispatch(getDataProduct(data));
            }

        })
            .catch((err) => console.log(err))
    }

}
// export function addFavourite(data) {
//     return {
//         type: types.ADD_FAVOURITE,
//         payload: data,

//     }
// }