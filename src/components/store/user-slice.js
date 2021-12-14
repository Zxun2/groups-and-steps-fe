import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../actions/actionTypes";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currUser: null, // no user
    auth_token: "", // jwt token
    status: USER_LOGGED_OUT,
  },
  reducers: {
    logUserIn(state, action) {
      console.log(action.payload.user);
      state.currUser = action.payload.user;
      state.auth_token = action.payload.token;
      state.status = USER_LOGGED_IN;
    },
    logUserOut(state, action) {
      state.currUser = null;
      state.auth_token = null;
      state.status = USER_LOGGED_OUT;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
