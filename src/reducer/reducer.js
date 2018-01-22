import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';




const defaultState = {
    movies: [],
    favourite: true,
    listFavourite:[]
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.GET_POPULAR:
            return{
                ...state, 
                movies:action.payload
            }
            // state.movies = action.payload;
            // return state;
        default:
            { return state; }
    }
}


// const reducer=combineReducers({
//     listPopular:reducerPopular,
// })
export default reducer;