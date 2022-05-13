import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../config";

const initialState = {
  images: [],
  quantity: 0,
  like: [],
  _id: "",
  name: "",
  product_name: "",
  model: "",
  description: "",
  price: 0,
  catagory: "",
  owner: {},
  bids: [],
  comments: [],
  likes: 0,
  alternatives: [],
  liked: false,
  createdAt: new Date().toString(),
};

const productInViewSlice = createSlice({
  name: "productInView",
  initialState,
  reducers: {
    refreshProduct: (state, { payload }) => {
      state._id = payload._id;
      state.createdAt = payload.createdAt;
      state.name = payload.name;
      state.product_name = payload.product_name;
      state.model = payload.model;
      state.description = payload.description;
      state.price = payload.price;
      state.createdAt = payload.createdAt;
      state.catagory = payload.catagory;
      state.owner = payload.owner;
      state.bids = payload.bids;
      state.comments = payload.comments;
      state.images = payload.images;
      state.quantity = payload.quantity;
      state.like = payload.like;
      state.likes = payload.likes;
      state.alternatives = payload.alternatives;
    },
    setLiked: (state, { payload }) => {
      state.liked = payload.like.includes(payload);
    },
    updateProductField: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
    exitProduct: (state, action) => {
      state = initialState;
    },
  },
});

export const { refreshProductField, refreshProduct, exitProduct } =
  productInViewSlice.actions;
export default productInViewSlice.reducer;
