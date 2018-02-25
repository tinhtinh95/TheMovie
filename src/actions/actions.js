import * as types from './actionTypes';
import API from '../api/api';

function getPopular(data) {
    return {
        type: types.GET_POPULAR,
        payload: data,

    }
}
function getTopRated(data) {
    return {
        type: types.GET_TOP_RATED,
        payload: data,

    }
}
export function fetchData(name, page) {
    return (dispatch) => {
        API.getList(name, page).then((data) => {
            if (name === 'popular') {
                console.log('po');
                dispatch(getPopular(data));
            } else if (name === 'top_rated') {
                console.log('top')
                dispatch(getTopRated(data));
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

// export function getFavourite(data) {
//     return {
//         type: types.GET_FAVOURITE,
//         payload: data,

//     }
// }