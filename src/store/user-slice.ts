import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../misc/constants";
import { API_URL } from "../misc/base-url";
import request from "../api";
import { User } from "../types/index";
import { RootState } from ".";
import { UserDetail } from "../components/auth/Login";

export interface UserData {
  user: User;
  token: string;
  message?: string;
}

interface UserState {
  currUser: User | null;
  auth_token: string | null;
  status: STATUS.USER_LOGGED_IN | STATUS.USER_LOGGED_OUT;
  fetching: boolean;
}

// POST /auth/auto_login
export const autoLogin = createAsyncThunk<UserData, string>(
  "User/autologin",
  async (token, _) => {
    const data = await request(
      "POST",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      },
      "Something went wrong! Please try again.",
      `${API_URL}/auth/auto_login`
    );

    const user = data;
    return { user, token } as UserData;
  }
);

// POST /auth/login
export const userLoggedIn = createAsyncThunk<UserData, UserDetail>(
  "User/login",
  async (userDetails, _) => {
    const { email, password } = userDetails;

    const content = { email, password };
    const data = await request(
      "POST",
      {
        headers: { "Access-Control-Allow-Origin": "*" },
        content,
      },
      "Something went wrong! Please try again.",
      `${API_URL}/auth/login`
    );

    const token = data.auth_token;
    const user = data.user;

    return { user, token } as UserData;
  }
);

// POST /signup
export const RegisterUser = createAsyncThunk<UserData, UserDetail>(
  "User/register",
  async (userDetails, _) => {
    const { name, email, password, password_confirmation } = userDetails;

    const content = { name, email, password, password_confirmation };

    const data = await request(
      "POST",
      {
        headers: { "Access-Control-Allow-Origin": "*" },
        content,
      },
      "Something went wrong! Please try again.",
      `${API_URL}/signup`
    );

    const { message, auth_token: token, user } = data;
    return { message, user, token } as UserData;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currUser: null,
    auth_token: "", // jwt token
    status: STATUS.USER_LOGGED_OUT,
    fetching: false,
  } as UserState,
  reducers: {
    logUserOut(state) {
      state.currUser = null;
      state.auth_token = null;
      state.status = STATUS.USER_LOGGED_OUT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedIn.pending, (state, _) => {
        state.fetching = true;
      })
      .addCase(userLoggedIn.fulfilled, (state, { payload }) => {
        const { user, token } = payload;

        state.currUser = user;
        state.auth_token = token;
        state.status = STATUS.USER_LOGGED_IN;
        state.fetching = false;
      })
      .addCase(userLoggedIn.rejected, (state, _) => {
        state.fetching = false;
      })
      .addCase(RegisterUser.pending, (state, _) => {
        state.fetching = true;
      })
      .addCase(RegisterUser.fulfilled, (state, { payload }) => {
        const { token, user } = payload;
        state.currUser = user;
        state.auth_token = token;
        state.status = STATUS.USER_LOGGED_IN;
        state.fetching = false;
      })
      .addCase(RegisterUser.rejected, (state, _) => {
        state.fetching = false;
      })
      .addCase(autoLogin.fulfilled, (state, { payload }) => {
        const { user, token } = payload;

        state.currUser = user;
        state.auth_token = token;
        state.status = STATUS.USER_LOGGED_IN;
      });
  },
});

export const getLoadingStatus = (state: RootState) => state.user.fetching;
export const getUserState = (state: RootState) => state.user;

export const userAction = userSlice.actions;
export default userSlice;
