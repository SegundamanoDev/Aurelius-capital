import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    // 1. The API Slice (Server data)
    [apiSlice.reducerPath]: apiSlice.reducer,

    // 2. The Auth Slice (Local UI state)
    auth: authReducer,
  },
  // Middleware is required for RTK Query's caching/polling features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
