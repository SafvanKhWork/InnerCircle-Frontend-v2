import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import productInViewReducer from "./Products/productInViewSlice";
import productListReducer from "./Products/productListSlice";
import userInViewReducer from "./User/userInViewSlice";
import applicationStateReducer from "./ApplicationStates/applicationStateSlice";
// import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore({
  reducer: {
    applicationState: applicationStateReducer,
    user: userReducer,
    userInView: userInViewReducer,
    products: productListReducer,
    productInView: productInViewReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  // serializableCheck: false,
  // }),
});

export default store;
