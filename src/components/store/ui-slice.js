import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: [] },
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
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
