import { createSlice } from "@reduxjs/toolkit";

const initialGenresState = {
  listLoading: false,
  entities: [],
  error: null
};

export const genresSlice = createSlice({
  name: "genres",
  initialState: initialGenresState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      state.listLoading = false;
    },
    startCall: (state) => {
      state.error = null;
      state.listLoading = true;
    },
    genresFetched: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.entities = entities;
      state.error = null;
    },
  }
});
