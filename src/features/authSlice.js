import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores user details like name, email, balance
  token: null, // Stores the JWT for backend requests
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Start loading when an auth request begins
    setLoading: (state) => {
      state.isLoading = true;
    },
    // Call this when login/register is successful
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      // Optional: Save token to localStorage for persistence
      localStorage.setItem("token", action.payload.token);
    },
    // Call this for login failures
    authError: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    // Logout logic
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    // Update user balance after an investment or profit
    updateBalance: (state, action) => {
      if (state.user) {
        state.user.walletBalance = action.payload;
      }
    },
  },
});

export const { setLoading, loginSuccess, authError, logout, updateBalance } =
  authSlice.actions;
export default authSlice.reducer;
