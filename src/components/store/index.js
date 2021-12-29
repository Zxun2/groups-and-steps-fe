import { configureStore } from "@reduxjs/toolkit";
import stepSlice from "./steps-slice";
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
    step: stepSlice.reducer,
  },
  // getDefaultMiddleware includes
  // Immutability-check, Serializability-check and redux-thunk middleware by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // remove devtools in production
  devTools: process.env.NODE_ENV !== "production",
  // support batched actions
  enhancers: [reduxBatch],
  //TODO: Add preloaded state for instructions
});

// To Add RootState for TypeScript

export default store;
