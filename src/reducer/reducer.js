import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { insertNewFavourite, deleteFavourite } from '../databases/Schemas';

const defaultState = {
    movies: [],
    listFavourite: [],
    isFavourite: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.GET_POPULAR:
            return {
                ...state,
                movies: action.payload
            }
        case types.GET_TOP_RATED:
            return {
                ...state,
                movies: action.payload
            }
        // case types.ADD_FAVOURITE:
        //     if (state.listFavourite.map(e => { return e.id })
        //         .indexOf(action.payload.id) != -1) {
        //         deleteFavourite(action.payload.id).then().catch(error => {
        //             alert(`Failed to delete Favourite with id = ${action.payload.id}, error=${error}`);
        //         });
        //         return {
        //             ...state,
        //             listFavourite: state.listFavourite.filter(e => (e.id != action.payload.id))
        //         }
        //     }
        //     else {
        //         insertNewFavourite(action.payload).then(
        //         ).catch((error) => {
        //             alert(`Insert new Favourite  error ${error}`);
        //         })
        //         return {
        //             ...state,
        //             listFavourite: state.listFavourite.concat(action.payload)
        //         }
        //     }
        // case types.GET_FAVOURITE: {
        //     return {
        //         ...state,
        //         listFavourite: action.payload
        //     }
        // }
        default:
            { return state; }
    }
}


// const reducer=combineReducers({
//     listPopular:reducerPopular,
// })
export default reducer;