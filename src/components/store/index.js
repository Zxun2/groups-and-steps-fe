import { configureStore } from "@reduxjs/toolkit";
import stepsSlice from "./steps-slice";
import todoSlice from "./todo-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import { reduxBatch } from "@manaflair/redux-batch";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    todo: todoSlice.reducer,
    step: stepsSlice.reducer,
  },
  // getDefaultMiddleware includes Immutability check middleware, Serializability check middleware and redux-thunk by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  // support batched actions
  enhancers: [reduxBatch],
  //TODO: Add preloaded state
});

export default store;
