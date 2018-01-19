import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';




const defaultState = {
    movies: [],
    favourite: true,
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_POPULAR:
        console.log(state.movies);
            state = action.payload;
            console.log('state reducer: ', state.movies)
            return state;
        default:
            return state;
    }
}


// const reducer=combineReducers({
//     listPopular:reducerPopular,
// })
export default reducer;