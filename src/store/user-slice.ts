import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserStatus, API_URL } from "../utils/constants";
import request from "../api";
import { User } from "../types/index";
import { RootState } from ".";
import { APIUserRequestType, APIUserResponseType } from "../types/index";

interface UserState {
  currUser: User | null;
  auth_token: string | null;
  status: UserStatus.USER_LOGGED_IN | UserStatus.USER_LOGGED_OUT;
  fetching: boolean;
}

const initialState: UserState = {
  currUser: null,
  auth_token: "", // jwt token
  status: UserStatus.USER_LOGGED_OUT,
  fetching: false,
};

// POST /auth/auto_login
export const autoLogin = createAsyncThunk<APIUserResponseType, string>(
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

    return { user: data, token };
  }
);

// POST /auth/login
export const userLoggedIn = createAsyncThunk<
  APIUserResponseType,
  APIUserRequestType
>("User/login", async (body, _) => {
  const { email, password } = body;

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

  const { auth_token, user } = data;

  return { user, token: auth_token };
});

// POST /signup
export const RegisterUser = createAsyncThunk<
  APIUserResponseType,
  APIUserRequestType
>("User/register", async (body, _) => {
  const { name, email, password, password_confirmation } = body;

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
  return { message, user, token };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUserOut(state) {
      state.currUser = null;
      state.auth_token = null;
      state.status = UserStatus.USER_LOGGED_OUT;
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
        state.status = UserStatus.USER_LOGGED_IN;
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
        state.status = UserStatus.USER_LOGGED_IN;
        state.fetching = false;
      })
      .addCase(RegisterUser.rejected, (state, _) => {
        state.fetching = false;
      })
      .addCase(autoLogin.fulfilled, (state, { payload }) => {
        const { user, token } = payload;

        state.currUser = user;
        state.auth_token = token;
        state.status = UserStatus.USER_LOGGED_IN;
      });
  },
});

export const getLoadingStatus = (state: RootState) => state.user.fetching;
export const getUserState = (state: RootState) => state.user;

export const userAction = userSlice.actions;
export default userSlice;
