/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../config";
import requests from "../../libs/request";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    console.log(email, password);
    const response = await Axios.post(`${requests.login}`, {
      email,
      password,
    });

    return response.data.user;
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await Axios.get(`${requests.logout}`);
});

const initialState = {
  address: "",
  avatar: "",
  email: "",
  isServiceProvider: false,
  name: "",
  phone: "",
  isLoogedIn: false,
  id: "",
  city: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        // Update the state with the user data received from the API
        state.loading = false;
        state.address = action.payload.address;
        state.avatar = action.payload.avatar;
        state.email = action.payload.email;
        state.isServiceProvider = action.payload.isServiceProvider;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
        state.id = action.payload._id;
        state.isLoogedIn = true;
        state.city = action.payload.city;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Update the state to handle the login failure
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutAsync.pending, (state) => {
        // Update the state to indicate that logout is in progress
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        // Update the state to handle the successful logout

        state.loading = false;
        state.address = "";
        state.avatar = "";
        state.email = "";
        state.isServiceProvider = false;
        state.name = "";
        state.phone = "";
        state.isLoogedIn = false;
        state.id = "";
        state.city = "";
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        // Update the state to handle the logout failure
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
