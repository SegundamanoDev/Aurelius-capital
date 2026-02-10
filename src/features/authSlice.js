import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    // This is the function the error is looking for!
    setCredentials: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token;

      // Keep user logged in on page refresh
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// 1. Export the actions (This fixes your "does not provide an export" error)
export const { setCredentials, logOut } = authSlice.actions;

// 2. Export the reducer as the default export
export default authSlice.reducer;
