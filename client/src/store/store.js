import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./querySlice/index.js";

const store = configureStore({
  reducer: {
    query: queryReducer,
  },
});

export default store;
