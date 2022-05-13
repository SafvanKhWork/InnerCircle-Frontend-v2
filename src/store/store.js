import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import productInViewReducer from "./Products/productInViewSlice";
import productListReducer from "./Products/productListSlice";
import userInViewReducer from "./User/userInViewSlice";
import applicationStateReducer from "./ApplicationStates/applicationStateSlice";

const store = configureStore({
  reducer: {
    applicationState: applicationStateReducer,
    user: userReducer,
    userInView: userInViewReducer,
    products: productListReducer,
    productInView: productInViewReducer,
  },
});

export default store;
