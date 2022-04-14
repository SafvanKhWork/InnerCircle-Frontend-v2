import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  username: "",
  avatar: "",
  circle: [],
  posts: [],
  sold: 0,
  bought: 0,
};

const userInViewSlice = createSlice({
  name: "userInView",
  initialState,
  reducers: {
    refreshUserInView: (state, { payload }) => {
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
      state.username = payload.username;
      state.avatar = payload.avatar;
      state.circle = payload.circle;
      state.posts = payload.posts;
      state.sold = payload.sold;
      state.bought = payload.bought;
      state.history = payload.history;
    },
    refreshUserInViewField: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
  },
});

export const { refreshUserInView, refreshUserInViewField } =
  userInViewSlice.actions;
export default userInViewSlice.reducer;
