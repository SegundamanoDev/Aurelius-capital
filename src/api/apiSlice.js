import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aurelius-backend-dsdm.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const stateToken = getState().auth?.token;
      const localToken = localStorage.getItem("token");
      const token = stateToken || localToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Trader", "Transaction"],
  endpoints: (builder) => ({
    // =========================
    // AUTH
    // =========================
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

    // =========================
    // USER (SELF)
    // =========================
    getMyProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getMyTransactions: builder.query({
      query: () => "/transactions/my-history",
      providesTags: ["Transaction", "User"],
    }),

    // =========================
    // USER (ADMIN)
    // =========================
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
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // =========================
    // TRANSACTIONS
    // =========================
    depositFunds: builder.mutation({
      query: (data) => ({
        url: "/transactions/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    withdrawFunds: builder.mutation({
      query: (data) => ({
        url: "/transactions/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    purchaseService: builder.mutation({
      query: (data) => ({
        url: "/transactions/purchase-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // =========================
    // TRANSACTIONS (ADMIN)
    // =========================
    getAllTransactions: builder.query({
      query: () => "/transactions/admin/all",
      providesTags: ["Transaction"],
    }),

    updateTransactionStatus: builder.mutation({
      query: (data) => ({
        url: "/transactions/admin/update-status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    injectLedgerEntry: builder.mutation({
      query: (data) => ({
        url: "/transactions/admin/inject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // =========================
    // TRADERS
    // =========================
    getTraders: builder.query({
      query: () => "/traders",
      providesTags: ["Trader"],
    }),

    startCopying: builder.mutation({
      query: (data) => ({
        url: "/traders/copy/start",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Trader"],
    }),

    stopCopying: builder.mutation({
      query: (traderId) => ({
        url: "/traders/copy/stop",
        method: "POST",
        body: { traderId },
      }),
      invalidatesTags: ["User", "Trader"],
    }),

    createTrader: builder.mutation({
      query: (newTrader) => ({
        url: "/traders",
        method: "POST",
        body: newTrader,
      }),
      invalidatesTags: ["Trader"],
    }),

    updateTrader: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/traders/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Trader"],
    }),

    deleteTrader: builder.mutation({
      query: (id) => ({
        url: `/traders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trader"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,

  // User (self)
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetMyTransactionsQuery,

  // Admin users
  useGetAllUsersQuery,
  useUpdateUserAdminMutation,
  useDeleteUserMutation,

  // Traders
  useGetTradersQuery,
  useCreateTraderMutation,
  useUpdateTraderMutation,
  useDeleteTraderMutation,
  useStartCopyingMutation,
  useStopCopyingMutation,

  // Transactions
  useDepositFundsMutation,
  useWithdrawFundsMutation,
  usePurchaseServiceMutation,

  // Admin transactions
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
  useInjectLedgerEntryMutation,
} = apiSlice;
