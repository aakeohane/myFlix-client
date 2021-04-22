import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch(action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function users(state = null, action) {
  switch(action.type) {
    case SET_USER:
      return action.value;
    default:
      return state
  }
}

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }

// using built in combineReducers function from redux to shorten code above to below

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  users
});

export default moviesApp;