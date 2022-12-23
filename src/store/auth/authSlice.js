import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
    checkingCredentials: (state, action) => {},
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
