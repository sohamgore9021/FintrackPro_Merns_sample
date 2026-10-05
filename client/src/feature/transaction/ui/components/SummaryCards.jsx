import React from "react";
import { Wallet, TrendingUp, TrendingDown, ReceiptText } from "lucide-react";
import SummaryCard from "./SummaryCard";

const SummaryCards = ({ dashboard }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <SummaryCard
        title="Current Balance"
        value={dashboard.currentBalance}
        icon={Wallet}
        iconBg="bg-[#e5eefc]"
        iconColor="text-[#4f7fc4]"
      />

      <SummaryCard
        title="Total Income"
        value={dashboard.totalIncome}
        icon={TrendingUp}
        iconBg="bg-[#dcf8e7]"
        iconColor="text-[#16b979]"
        valueColor="text-[#16b979]"
      />

      <SummaryCard
        title="Total Expense"
        value={dashboard.totalExpense}
        icon={TrendingDown}
        iconBg="bg-[#ffe1e4]"
        iconColor="text-[#ef4444]"
        valueColor="text-[#ef4444]"
      />

      <SummaryCard
        title="Total Transactions"
        value={dashboard.totalTransactions}
        icon={ReceiptText}
        iconBg="bg-[#e5eefc]"
        iconColor="text-[#4f7fc4]"
        showCurrency={false}
      />
    </div>
  );
};

export default SummaryCards;
