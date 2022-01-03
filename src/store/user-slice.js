import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../misc/constants";
import { API_URL } from "../misc/base-url";

// POST /auth/auto_login
export const autoLogin = createAsyncThunk(
  "User/autologin",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/auto_login`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();

      if (response.status === 422 || !response.ok) {
        if (!response.ok) {
          throw new Error("Something went wrong! Please try again.");
        }
        throw new Error(data.message);
      }

      const user = data;

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// POST /auth/login
export const userLoggedIn = createAsyncThunk(
  "User/login",
  async (userDetails, { rejectWithValue }) => {
    const { email, password } = userDetails;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Error is handled by the Try-Catch block in Login.jsx
      if (response.status === 422 || !response.ok) {
        if (!response.ok) {
          throw new Error("Something went wrong! Please try again.");
        }
        throw new Error(data.message);
      }

      const token = data.auth_token;
      const user = data.user;

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// POST /signup
export const RegisterUser = createAsyncThunk(
  "User/register",
  async (userDetails, { rejectWithValue }) => {
    const { name, email, password, password_confirmation } = userDetails;

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
        }),
      });

      const data = await response.json();

      // Error is handled by the Try-Catch block in Login.jsx
      if (response.status === 422 || !response.ok) {
        if (!response.ok) {
          throw new Error("Something went wrong! Please try again.");
        }
        throw new Error(data.message);
      }

      const { message, auth_token: token, user } = data;

      return { message, user, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currUser: null,
    auth_token: "", // jwt token
    status: USER_LOGGED_OUT,
    fetching: false,
  },
  reducers: {
    logUserOut(state) {
      state.currUser = null;
      state.auth_token = null;
      state.status = USER_LOGGED_OUT;
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
        state.status = USER_LOGGED_IN;
        state.fetching = false;
      })
      .addCase(userLoggedIn.rejected, (state, _) => {
        state.fetching = false;
      })
      .addCase(RegisterUser.pending, (state, _) => {
        state.fetching = true;
      })
      .addCase(RegisterUser.fulfilled, (state, { payload }) => {
        console.log(payload, "HELLOW FROM SLICE!!!");
        const { token, user } = payload;
        state.currUser = user;
        state.auth_token = token;
        state.status = USER_LOGGED_IN;
        state.fetching = false;
      })
      .addCase(RegisterUser.rejected, (state, _) => {
        state.fetching = false;
      })
      .addCase(autoLogin.fulfilled, (state, { payload }) => {
        const { user, token } = payload;

        state.currUser = user;
        state.auth_token = token;
        state.status = USER_LOGGED_IN;
      });
  },
});

export const getLoadingStatus = (state) => state.user.fetching;

export const userAction = userSlice.actions;
export default userSlice;
