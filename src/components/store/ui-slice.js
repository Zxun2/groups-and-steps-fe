import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

// TO ADD: interfaces for initial state

// A function that accepts an initial state, an object of reducer functions,
// and a "slice name", and automatically generates action creators and action types
// that correspond to the reducers and state.

/**
 * createSlice will return an object that looks like this
 * {
 *  name: string,
 *  reducer: ReducerFunction,
 *  actions: Record<string, ActionCreator>
 *  caseReducers: Record<string, CaseReducer>,
 *  getInitialState: () => State
 * }
 */

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

export const uiAction = uiSlice.actions;
export default uiSlice;
