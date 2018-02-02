import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';




const defaultState = {
    movies: [],
    listFavourite: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.GET_POPULAR:
            return {
                ...state,
                movies: action.payload
            }
        //  case types.ADD_FAVOURITE:{
        //      return{
        //          ...state,
        //          listFavourite: action.payload
        //      }
        //  }
        default:
            { return state; }
    }
}


// const reducer=combineReducers({
//     listPopular:reducerPopular,
// })
export default reducer;