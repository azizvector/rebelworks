import { configureStore } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import { rootReducer } from "./rootReducer";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  });

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch]
});

export default store;
