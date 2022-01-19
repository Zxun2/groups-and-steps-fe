import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { RootState } from ".";
import { Notification } from "../types/index";

interface NotificationState {
  notification: Notification[];
  globalState: boolean;
}

const initialState = { notification: [], globalState: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState as NotificationState,
  reducers: {
    showNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notification.push(action.payload);
      },
      prepare: (payload: Notification) => {
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

export const getLoadingState = (state: RootState) => state.ui.globalState;
export const getAllNotifications = (state: RootState) => state.ui.notification;

export const uiAction = uiSlice.actions;
export default uiSlice;
