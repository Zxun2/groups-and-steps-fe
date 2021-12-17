import { configureStore } from "@reduxjs/toolkit";
import stepsSlice from "./steps-slice";
import todoSlice from "./todo-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    todo: todoSlice.reducer,
    step: stepsSlice.reducer,
  },
});

export default store;
