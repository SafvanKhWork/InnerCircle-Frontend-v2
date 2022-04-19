import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../config";
import { setLoading } from "../ApplicationStates/applicationStateSlice";

//Add createAsyncThunks
export const refetchUser = createAsyncThunk(
  "user/refetchUser",
  async (args, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const state = thunkAPI.getState();
    const response = await axios.get(`${url}/user/me`, {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    thunkAPI.dispatch(setLoading(false));
    if (response.data) {
      thunkAPI.dispatch(refreshUser(response.data));
    }
    return response.data;
  }
);

const initialState = {
  _id: "",
  name: "",
  email: "",
  username: "",
  avatar: "",
  friendRequest: [],
  sentFriendRequest: [],
  circle: [],
  history: [],
  recommandation: [],
  notifications: [],
  token: window.localStorage.getItem("inner-circle-token")?.split('"')[1] || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, { payload }) => {
      state.token = window.localStorage
        .getItem("inner-circle-token")
        .split('"')[1];
    },
    refreshUser: (state, { payload }) => {
      //Always runs at init
      try {
        if (payload) {
          state._id = payload._id;
          state.name = payload.name;
          state.email = payload.email;
          state.username = payload.username;
          state.avatar = payload.avatar;
          state.friendRequest = payload.friendRequest;
          state.sentFriendRequest = payload.sentFriendRequest;
          state.circle = payload.circle;
          state.history = payload.history;
          state.recommandation = payload.recommandation;
          state.notifications = payload.notifications;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    // sendFriendRequest: async (state, { payload }) => {
    //   try {
    //     const { data } = await axios.post(
    //       `${url}/add-friend/${payload}`,
    //       authHeader
    //     );
    //     state.friendRequest = data ? data : state.friendRequest;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    // acceptFriendRequest: async (state, { payload }) => {
    //   try {
    //     const { data } = await axios.patch(
    //       `${url}/accept-friend-request/${payload}`,
    //       authHeader
    //     );
    //     state.circle = data ? data : state.circle;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    // unfriendUser: async (state, { payload }) => {
    //   try {
    //     const { data } = await axios.delete(
    //       `${url}/unfriend/${payload}`,
    //       authHeader
    //     );
    //     state.circle = data ? data : state.circle;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    // rejectFriendRequest: async (state, { payload }) => {
    //   try {
    //     const { data } = await axios.delete(
    //       `${url}/reject-friend-request/${payload}`,
    //       authHeader
    //     );
    //     state.friendRequest = data ? data : state.friendRequest;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    // updateAccountDetail: async (state, { payload }) => {
    //   try {
    //     const { data } = await axios.patch(
    //       `${url}/users/me`,
    //       payload,
    //       authHeader
    //     );
    //     Object.keys(payload).forEach((field) => {
    //       state[field] = payload[field];
    //     });
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    // refreshHistory: async (state, { payload }) => {
    //   try {
    //     const { data } = await axios.get(`${url}/account/history`);
    //     state.history = data ? data : state.history;
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // },
    refreshUserField: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
    logout: (state, { payload }) => {
      try {
        // if (state.token !== "") {
        //   axios.post(`${url}/user/logout`, "data", {
        //     headers: { Authorization: `Bearer ${state.token}` },
        //   });
        // }
        state.token = "";
        window.localStorage.setItem("inner-circle-token", "");
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  extraReducers: {
    [refetchUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [refetchUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [refetchUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const {
  initUser,
  signIn,
  refreshUser,
  refreshUserField,
  refreshHistory,
  sendFriendRequest,
  acceptFriendRequest,
  unfriendUser,
  rejectFriendRequest,
  updateAccountDetail,
  logout,
} = userSlice.actions;
export const getUser = (state) => state.user;
export const getToken = (state) => state.user.token;
export default userSlice.reducer;
