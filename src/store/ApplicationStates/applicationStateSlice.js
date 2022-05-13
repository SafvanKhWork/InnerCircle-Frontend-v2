import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loggedIn: false,
  existingUser: true,
  verifiedEmail: false,
  forgotPassword: false,
  email: "",
};

const applicationStateSlice = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    setGlobalEmail: (state, { payload }) => {
      state.email = payload;
    },
    login: (state, action) => {
      state.loggedIn = true;
    },
    setLoading: (state, { payload }) => (state.loading = payload),
    logout: (state, action) => {
      const tempState = { ...current(state) };
      tempState.loggedIn = false;
      return tempState;
    },
    createAccount: (state, action) => {
      const tempState = { ...current(state) };
      tempState.existingUser = false;
      return tempState;
    },
    accountCreated: (state, action) => {
      const tempState = { ...current(state) };
      tempState.existingUser = true;
      return tempState;
    },
    forgotPassword: (state, action) => {
      const tempState = { ...current(state) };
      tempState.forgotPassword = true;
      return tempState;
    },
    hasPassword: (state, action) => {
      state.forgotPassword = false;
    },
    reset: (state, action) => initialState,
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
  reset,
  setGlobalEmail,
} = applicationStateSlice.actions;
export default applicationStateSlice.reducer;
