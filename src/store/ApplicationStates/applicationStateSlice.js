import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loggedIn: false,
  existingUser: true,
  verifiedEmail: false,
  forgotPassword: false,
  cardHeight: 200,
};

const applicationStateSlice = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    setCardHeight: (state, { payload }) => (state.cardHeight = payload),
    login: (state, action) => (state.loggedIn = true),
    setLoading: (state, { payload }) => (state.loading = payload),
    logout: (state, action) => (state.loggedIn = false),
    createAccount: (state, action) => (state.existingUser = false),
    accountCreated: (state, action) => {
      state.loggedIn = true;
      state.existingUser = true;
    },
    hasAccount: (state, action) => (state.existingUser = false),
    forgotPassword: (state, action) => (state.forgotPassword = true),
    hasPassword: (state, action) => (state.forgotPassword = false),
  },
});

export const {
  setCardHeight,
  login,
  logout,
  createAccount,
  accountCreated,
  hasAccount,
  forgotPassword,
  hasPassword,
  setLoading,
} = applicationStateSlice.actions;
export default applicationStateSlice.reducer;
