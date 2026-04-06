import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import {
  useGetMyProfileQuery,
  useGetMyTransactionsQuery,
} from "../../api/apiSlice";

import {
  HiOutlineArrowPath,
  HiOutlineArrowDownLeft,
  HiOutlineArrowUpRight,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";

import { getSymbol } from "../public/Register";

const Transactions = () => {
  const navigate = useNavigate();

  const { data: profileData } = useGetMyProfileQuery();
  const currencySymbol = getSymbol(profileData?.wallet?.currency);

  const {
    data: transactions = [],
    isLoading,
    isError,
    refetch,
  } = useGetMyTransactionsQuery();

  // ---------------- STATUS STYLE ----------------

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "failed":
        return "bg-rose-100 text-rose-600 border-rose-200";
      default:
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  // ---------------- ICON ----------------

  const getTxIcon = (type) => {
    const t = type?.toLowerCase();

    if (t.includes("deposit") || t.includes("profit"))
      return <HiOutlineArrowDownLeft className="text-emerald-500" size={20} />;

    if (t.includes("withdraw"))
      return <HiOutlineArrowUpRight className="text-rose-500" size={20} />;

    return <HiOutlineArrowsRightLeft className="text-sky-500" size={20} />;
  };

  // ---------------- AMOUNT STYLE ----------------

  const getAmountStyle = (type) => {
    const t = type?.toLowerCase();

    if (t.includes("deposit") || t.includes("profit")) {
      return {
        color: "text-emerald-600",
        sign: "+",
      };
    }

    if (t.includes("withdraw")) {
      return {
        color: "text-rose-600",
        sign: "-",
      };
    }

    return {
      color: "text-gray-700",
      sign: "",
    };
  };

  // ---------------- OPEN RECEIPT ----------------

  const openReceipt = (tx) => {
    localStorage.setItem("receipt_tx", JSON.stringify(tx));
    window.open("/dashboard/receipt", "_blank");
  };

  // ---------------- UI ----------------

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-500 text-sm">
            View all your transaction history
          </p>
        </div>

        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
        >
          <HiOutlineArrowPath className={clsx(isLoading && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-10 text-center text-gray-500">
            Loading transactions...
          </div>
        ) : isError ? (
          <div className="p-10 text-center text-red-500">
            Failed to load transactions
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No transactions yet
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-sm">Type</th>
                <th className="p-4 text-left text-sm">Date</th>
                <th className="p-4 text-right text-sm">Amount</th>
                <th className="p-4 text-center text-sm">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => {
                const amountStyle = getAmountStyle(tx.type);

                return (
                  <tr
                    key={tx._id}
                    onClick={() => openReceipt(tx)}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="p-4 flex items-center gap-3">
                      {getTxIcon(tx.type)}
                      <span className="capitalize">{tx.type}</span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>

                    {/* UPDATED AMOUNT */}

                    <td
                      className={clsx(
                        "p-4 text-right font-semibold",
                        amountStyle.color,
                      )}
                    >
                      {amountStyle.sign}
                      {currencySymbol}
                      {tx.amount.toLocaleString()}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={clsx(
                          "px-3 py-1 rounded-full text-xs border",
                          getStatusStyle(tx.status),
                        )}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Click any transaction to open receipt
      </p>
    </div>
  );
};

export default Transactions;
