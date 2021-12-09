import { combineReducers } from "redux";

import { moviesSlice } from "./movies/moviesSlice";
import { genresSlice } from "./genres/genresSlice";

export const rootReducer = combineReducers({
  movies: moviesSlice.reducer,
  genres: genresSlice.reducer,
});