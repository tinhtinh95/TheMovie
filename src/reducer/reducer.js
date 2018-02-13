import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { getTableList, FAVOURITE } from './../databases/Schemas';




const defaultState = {
    movies: [],
    // listFavourite: [],
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
        //     console.log(action.payload);
        //     return {
        //         ...state,
        //         listFavourite: state.listFavourite.concat(action.payload)
        //     }
        // case types.TOGGLE_FAVOURITE: {
        //     return {
        //         ...state,
        //         isFavourite:true,
        //     }
        // }
        case types.TOGGLE_FAVOURITE: {
            getTableList(FAVOURITE)
            .then()
            .catch();
            return {
                ...state,
                isFavourite: !state.isFavourite,
                
            }
        }
        default:
            { return state; }
    }
}


// const reducer=combineReducers({
//     listPopular:reducerPopular,
// })
export default reducer;