import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../misc/constants";

// TO ADD: interfaces for initial state

// A function that accepts an initial state, an object of reducer functions,
// and a "slice name", and automatically generates action creators and action types
// that correspond to the reducers and state.

/**
 createSlice will return an object that looks like this
 {
 *  name: string,
 *  reducer: ReducerFunction,
 *  actions: Record<string, ActionCreator>
 *  caseReducers: Record<string, CaseReducer>,
 *  getInitialState: () => State
 * }
 */

interface User {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  name: string;
  password_digest: string;
}
interface userState {
  currUser: User;
  status: USER_LOGGED_IN | USER_LOGGED_OUT;
  auth_token: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currUser: null,
    auth_token: "", // jwt token
    status: USER_LOGGED_OUT,
  } as userState,
  reducers: {
    logUserIn(state, action) {
      state.currUser = action.payload.user;
      state.auth_token = action.payload.token;
      state.status = USER_LOGGED_IN;
    },
    logUserOut(state) {
      state.currUser = null;
      state.auth_token = null;
      state.status = USER_LOGGED_OUT;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
