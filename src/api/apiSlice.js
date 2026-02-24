import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// "https://aurelius-backend-dsdm.onrender.com/api",
// "http://localhost:5000/api",
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aurelius-backend-dsdm.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User", "Trader", "Transaction", "Message", "Copy", "Wallet"],
  endpoints: (builder) => ({
    // ==========================================
    // AUTHENTICATION
    // ==========================================
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // ==========================================
    // USER PROFILE & MESSAGING
    // ==========================================
    getMyProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User", "Wallet"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({ url: "/users/profile", method: "PUT", body: data }),
      invalidatesTags: ["User"],
    }),
    getChatHistory: builder.query({
      query: (userId) => `/chat/history/${userId}`,
      providesTags: ["Message"],
    }),
    sendChatMessage: builder.mutation({
      query: (data) => ({ url: "/chat/send", method: "POST", body: data }),
      invalidatesTags: ["Message"],
    }),

    // ==========================================
    // WALLET & PERSONAL TRANSACTIONS
    // ==========================================
    getMyWallet: builder.query({
      query: () => "/wallet",
      providesTags: ["Wallet"],
    }),
    getMyTransactions: builder.query({
      query: () => "/transactions/my-history",
      providesTags: ["Transaction"],
    }),
    depositFunds: builder.mutation({
      query: (data) => ({ url: "/wallet/deposit", method: "POST", body: data }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    withdrawFunds: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),
    purchaseService: builder.mutation({
      query: (data) => ({
        url: "/transactions/purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet", "Transaction"],
    }),

    // ==========================================
    // TRADERS & COPY TRADING
    // ==========================================
    getTraders: builder.query({
      query: (params) => ({ url: "/traders", params }),
      providesTags: ["Trader"],
    }),
    getTraderById: builder.query({
      query: (id) => `/traders/${id}`,
      providesTags: (id) => [{ type: "Trader", id }],
    }),
    getMyCopies: builder.query({
      query: () => "/traders/copy/my",
      providesTags: ["Copy"],
    }),
    startCopying: builder.mutation({
      query: (data) => ({
        url: "/traders/copy/start",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Copy", "Wallet", "Trader"],
    }),
    updateCopyAllocation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/traders/copy/adjust/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Copy", "Wallet"],
    }),
    stopCopying: builder.mutation({
      query: (id) => ({ url: `/traders/copy/stop/${id}`, method: "POST" }),
      invalidatesTags: ["Copy", "Wallet"],
    }),

    // ==========================================
    // ADMIN OPERATIONS
    // ==========================================
    getAllUsers: builder.query({
      query: () => "/users/admin/all",
      providesTags: ["User"],
    }),
    updateUserAdmin: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/admin/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/admin/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
    getAllTransactions: builder.query({
      query: () => "/transactions/admin/all",
      providesTags: ["Transaction"],
    }),

    // THE MASTER SETTLEMENT ENDPOINT
    updateTransactionStatus: builder.mutation({
      query: ({ transactionId, status }) => ({
        url: "/transactions/admin/update-status",
        method: "PUT",
        body: { transactionId, status },
      }),
      invalidatesTags: ["Transaction", "Wallet", "User"],
    }),

    // SPECIFIC DEPOSIT APPROVAL (Fixed URL Template)
    approveDeposit: builder.mutation({
      query: (transactionId) => ({
        url: `/wallet/approve-deposit/${transactionId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    injectProfit: builder.mutation({
      query: (data) => ({
        url: "/transactions/inject-profit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Transaction", "Wallet"],
    }),

    // TRADER MANAGEMENT
    createTrader: builder.mutation({
      query: (data) => ({ url: "/traders", method: "POST", body: data }),
      invalidatesTags: ["Trader"],
    }),
    updateTrader: builder.mutation({
      query: ({ id, data }) => ({
        url: `/traders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Trader"],
    }),
    deleteTrader: builder.mutation({
      query: (id) => ({ url: `/traders/${id}`, method: "DELETE" }),
      invalidatesTags: ["Trader"],
    }),
    injectLedgerEntry: builder.mutation({
      query: (data) => ({
        url: "/transactions/admin/inject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet", "User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetChatHistoryQuery,
  useSendChatMessageMutation,
  useGetMyWalletQuery,
  useGetMyTransactionsQuery,
  useDepositFundsMutation,
  useWithdrawFundsMutation,
  usePurchaseServiceMutation,
  useGetTradersQuery,
  useGetTraderByIdQuery,
  useGetMyCopiesQuery,
  useStartCopyingMutation,
  useUpdateCopyAllocationMutation,
  useStopCopyingMutation,
  useGetAllUsersQuery,
  useUpdateUserAdminMutation,
  useDeleteUserMutation,
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
  useApproveDepositMutation,
  useInjectProfitMutation,
  useCreateTraderMutation,
  useUpdateTraderMutation,
  useDeleteTraderMutation,
  useInjectLedgerEntryMutation,
} = apiSlice;
