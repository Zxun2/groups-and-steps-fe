import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

/**
 * interface Notification {
 *  message: string;
 *  status: string;
 *  title: string;
 *  id: string;
 * }
 */

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: [], globalState: false },
  reducers: {
    // Customizing Generated Action Creators
    // This reducer must be an object with two properties, reducer and prepare.
    showNotification: {
      reducer: (state, action) => {
        state.notification.push(action.payload);
      },
      prepare: (payload) => {
        const id = v4();
        return { payload: { ...payload, id } };
      },
    },
    removeNotification(state, action) {
      state.notification.shift();
    },
    updateGlobalState(state, action) {
      state.globalState = action.payload.status;
    },
  },
});

export const getLoadingState = (state) => state.ui.globalState;

export const uiAction = uiSlice.actions;
export default uiSlice;
