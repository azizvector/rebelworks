import * as requestFromServer from "./moviesCrud";
import { moviesSlice, callTypes } from "./moviesSlice";

const { actions } = moviesSlice;

export const fetchMovies = page => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMovies(page)
    .then(response => {
      const { results } = response.data;
      dispatch(actions.moviesFetched({ entities: results }));
    })
    .catch(error => {
      error.clientMessage = "Can't find movies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMoviesSimilar = id => dispatch => {
  if (!id) {
    return dispatch(actions.moviesSimilarFetched({ entitiesSimilar: null }));
  }
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMoviesSimilar(id)
    .then(response => {
      const { results } = response.data;
      dispatch(actions.moviesSimilarFetched({ entitiesSimilar: results }));
    })
    .catch(error => {
      error.clientMessage = "Can't find movies similar";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMovie = id => dispatch => {
  if (!id) {
    return dispatch(actions.movieFetched({ movieDetails: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .findMovie(id)
    .then(response => {
      const { data } = response;
      dispatch(actions.movieFetched({ movieDetails: data }));
    })
    .catch(error => {
      error.clientMessage = "Can't find movie";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};