import * as requestFromServer from "./genresCrud";
import { genresSlice } from "./genresSlice";

const { actions } = genresSlice;

export const fetchGenres = () => dispatch => {
  dispatch(actions.startCall());
  return requestFromServer
    .findGenres()
    .then(response => {
      const { genres } = response.data;
      dispatch(actions.genresFetched({ entities: genres }));
    })
    .catch(error => {
      error.clientMessage = "Can't find genres";
      dispatch(actions.catchError({ error }));
    });
};