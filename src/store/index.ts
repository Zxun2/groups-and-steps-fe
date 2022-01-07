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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
