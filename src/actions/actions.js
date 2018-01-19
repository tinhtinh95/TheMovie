import * as types from './actionTypes';
import API from '../api/api';

function getPopular(data) {
    return {
        type: types.GET_POPULAR,
        payload: data,

    }
}
export function fetchData() {
    return (dispatch) => {
        API.getList().then((data) => {
            // if (name === 'type') {
                console.log('state fetchdatap:', data)
                dispatch(getPopular(data));
            // } else if (name === 'product') {
            //     dispatch(getDataProduct(data));
            // }

        })
            .catch((err) => console.log(err))
    }

}