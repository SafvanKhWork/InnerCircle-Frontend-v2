import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loggedIn: false,
  existingUser: true,
  verifiedEmail: false,
  forgotPassword: false,
};

const applicationStateSlice = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    login: (state, action) => (state.loggedIn = true),
    setLoading: (state, { payload }) => (state.loading = payload),
    logout: (state, action) => {
      const tempState = { ...current(state) };
      tempState.loggedIn = false;
      return tempState;
    },
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
