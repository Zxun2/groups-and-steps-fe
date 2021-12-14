import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    resetNotification(state) {
      state.notification = null;
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
