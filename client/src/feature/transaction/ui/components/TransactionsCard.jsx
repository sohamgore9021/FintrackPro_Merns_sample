import React, { useContext, useEffect, useState } from "react";
import { Search, ReceiptText } from "lucide-react";
import TransactionRow from "./TransactionRow";
import useApi from "../../../auth/api/authApi";
import { MyStore } from "../../../../app/context/MyContext";

const TransactionsCard = ({ transactions, getDashboard }) => {
  const [searchInput, setSearchInput] = useState("");
  const { setTransactions } = useContext(MyStore);
  const api = useApi();

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      getDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  const searchTransaction = async () => {
    try {
      const res = await api.get(`/transactions/search?query=${searchInput}`);
      setTransactions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchInput.trim()) {
      getDashboard();
      return;
    }

    let timeout = setTimeout(() => {
      searchTransaction();
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <div className="bg-white border border-[#dfe5ed] rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Recent Transactions</h2>

            <p className="text-sm text-[#8792a8] mt-1">
              Your latest financial activity
            </p>
          </div>

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8792a8]"
            />

            <input
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              placeholder="Search transactions..."
              className="w-full sm:w-64 h-10 pl-10 pr-4 rounded-lg border border-[#dfe5ed] text-sm outline-none focus:border-[#101b32]"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="hidden sm:grid grid-cols-5 gap-3 px-4 py-3 bg-[#f8fafc] text-xs font-semibold text-[#63708a] uppercase">
        <span>Date</span>
        <span>Title</span>
        <span>Category</span>
        <span>Amount</span>
        <span>Actions</span>
      </div>

      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionRow
            key={transaction._id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
            getDashboard={getDashboard}
          />
        ))
      ) : (
        <div className="py-14 flex flex-col items-center text-center">
          <ReceiptText size={30} className="text-[#a0aabd]" />

          <h3 className="font-semibold mt-3">No transactions yet</h3>

          <p className="text-sm text-[#8792a8] mt-1">
            Add your first transaction to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionsCard;
