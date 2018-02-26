import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { insertNewFavourite, deleteFavourite } from '../databases/Schemas';

const defaultState = {
    movies: [],
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.GET_POPULAR:
            return {
                ...state,
                movies: //action.payload
                state.movies.concat(action.payload),
            }
        
        case types.GET_TOP_RATED:
            return {
                ...state,
                movies: action.payload
            }
        default:
            { return state; }
    }
} 

export default reducer;