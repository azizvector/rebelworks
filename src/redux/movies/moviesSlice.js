import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  listLoading: false,
  actionsLoading: false,
  entities: [],
  entitiesSimilar: [],
  movieDetails: undefined,
  error: null
};

export const callTypes = {
  list: "list",
  action: "action"
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    moviesFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.entities = entities;
      state.error = null;
    },
    moviesSimilarFetched: (state, action) => {
      const { entitiesSimilar } = action.payload;
      state.listLoading = false;
      state.entitiesSimilar = entitiesSimilar;
      state.entities = [];
      state.error = null;
    },
    movieFetched: (state, action) => {
      const { movieDetails } = action.payload;
      state.actionsLoading = false;
      state.movieDetails = movieDetails;
      state.error = null;
    },
  }
});
