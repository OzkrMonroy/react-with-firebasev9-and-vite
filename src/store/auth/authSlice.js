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
  initialState: { ...initialState },
  reducers: {
    login: (_, { payload }) => {
      return { ...payload, status: "authenticated", errorMessage: null };
    },
    logout: (_, { payload }) => {
      return {
        ...initialState,
        errorMessage: payload?.errorMessage,
      };
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
