import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import adminReducer from "../features/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});
