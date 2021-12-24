import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: [], globalState: false },
  reducers: {
    showNotification(state, action) {
      state.notification.push({
        id: v4(),
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      });
    },
    removeNotification(state, action) {
      state.notification.shift();
    },
    updateGlobalState(state, action) {
      state.globalState = action.payload.status;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
