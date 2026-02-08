import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 12450.0,
  activeInvestments: 8000.0,
  pendingWithdrawals: 0,
  transactions: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    depositFunds: (state, action) => {
      // In real MERN, this updates after Admin confirms
      state.transactions.unshift({
        id: Date.now(),
        type: "Deposit",
        amount: action.payload,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      });
    },
    investInPlan: (state, action) => {
      const amount = action.payload;
      if (state.balance >= amount) {
        state.balance -= amount;
        state.activeInvestments += amount;
        state.transactions.unshift({
          id: Date.now(),
          type: "Investment",
          amount: -amount,
          status: "Active",
          date: new Date().toLocaleDateString(),
        });
      }
    },
    requestWithdrawal: (state, action) => {
      const amount = action.payload;
      if (state.balance >= amount) {
        state.balance -= amount;
        state.pendingWithdrawals += amount;
        state.transactions.unshift({
          id: Date.now(),
          type: "Withdrawal",
          amount: -amount,
          status: "Processing",
          date: new Date().toLocaleDateString(),
        });
      }
    },
  },
});

export const { depositFunds, investInPlan, requestWithdrawal } =
  userSlice.actions;
export default userSlice.reducer;
