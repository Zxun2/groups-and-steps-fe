import { configureStore } from "@reduxjs/toolkit";
import stepSlice from "./steps-slice";
import todoSlice from "./todo-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import { reduxBatch } from "@manaflair/redux-batch";
import logger from "redux-logger";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    todo: todoSlice.reducer,
    step: stepSlice.reducer,
  },
  // getDefaultMiddleware includes Immutability-check, Serializability-check and redux-thunk middleware by default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // prepend and concat calls can be chained
      .concat(logger),
  // remove devtools in production
  devTools: process.env.NODE_ENV !== "production",
  // support batched actions
  enhancers: [reduxBatch],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export default store;
