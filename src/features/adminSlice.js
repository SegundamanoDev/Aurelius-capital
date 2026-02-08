import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      balance: 12450,
      profit: 1200,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.s@gmail.com",
      balance: 5400,
      profit: 450,
      status: "Pending",
    },
  ],
  investmentLogs: [
    {
      id: "INV-901",
      user: "John Doe",
      plan: "Gold Elite",
      amount: 25000,
      date: "2024-05-10",
      status: "Active",
    },
    {
      id: "INV-902",
      user: "Sarah Smith",
      plan: "Silver Tier",
      amount: 5000,
      date: "2024-05-11",
      status: "Active",
    },
    {
      id: "INV-903",
      user: "Mike Ross",
      plan: "Bronze Pass",
      amount: 1200,
      date: "2024-05-12",
      status: "Completed",
    },
  ],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateUserFinance: (state, action) => {
      const { userId, type, amount } = action.payload; // type: 'balance' or 'profit'
      const user = state.allUsers.find((u) => u.id === userId);
      if (user) {
        user[type] += parseFloat(amount);
      }
    },
    toggleUserStatus: (state, action) => {
      const user = state.allUsers.find((u) => u.id === action.payload);
      if (user) {
        user.status = user.status === "Active" ? "Suspended" : "Active";
      }
    },
  },
});

export const { updateUserFinance, toggleUserStatus } = adminSlice.actions;
export default adminSlice.reducer;
