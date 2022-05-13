import { createSlice } from "@reduxjs/toolkit";

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
        state.catagory = [...payload];
      } catch (error) {
        console.error(error.message);
      }
    },
    refreshFeed: (state, { payload }) => {
      try {
        state.feed = [...payload];
      } catch (error) {
        console.log(error.message);
      }
    },
    refreshRecommandation: (state, { payload }) => {
      try {
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
} = productListSlice.actions;
export default productListSlice.reducer;
