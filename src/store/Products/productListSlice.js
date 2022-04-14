import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../config";

let authHeader;

const initialState = {
  current: [],
  discover: [],
  feed: [],
  recommandation: [],
  catagory: [],
  catagories: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    refreshProductLists: (state, { payload }) => {
      state.discover = [...payload];
    },
    refreshCatagories: (state, { payload }) => {
      state.catagories = [...payload];
    },
    refreshCatagory: (state, { payload }) => {
      try {
        // const { data } = await axios.get(
        //   `${url}/products/catagory/${payload}`,
        //   authHeader
        // );
        state.catagory = [...payload];
      } catch (error) {
        console.error(error.message);
      }
    },
    refreshFeed: (state, { payload }) => {
      try {
        // const { data } = await axios.get(`${url}/feed`, authHeader);
        state.feed = [...payload];
      } catch (error) {
        console.log(error.message);
      }
    },
    refreshRecommandation: (state, { payload }) => {
      try {
        // const { data } = axios.get(`${url}/recommanded`, authHeader);
        state.recommandation = [...payload];
      } catch (error) {
        console.log(error.message);
      }
    },
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
    setSpecifiedList: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
  },
});

export const {
  refreshProductLists,
  refreshFeed,
  refreshCatagories,
  changeCatagory,
  setCurrent,
  setSpecifiedList,
  refreshRecommandation,
  refreshCatagory,
  refreshSpecifiedList,
} = productListSlice.actions;
export default productListSlice.reducer;
