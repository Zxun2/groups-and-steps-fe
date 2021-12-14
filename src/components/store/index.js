import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    todo: todoSlice.reducer,
  },
});

export default store;
