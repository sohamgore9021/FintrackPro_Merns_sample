import React from "react";
import { BarChart3 } from "lucide-react";

const CashFlowCard = ({ graph }) => {
  const max = Math.max(graph.income, graph.expense, 1);

  const incomeHeight = `${(graph.income / max) * 100}%`;
  const expenseHeight = `${(graph.expense / max) * 100}%`;

  return (
    <div className="bg-white border border-[#dfe5ed] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Cash Flow Analysis</h2>

          <p className="text-sm text-[#8792a8] mt-1">
            Income vs expense overview
          </p>
        </div>

        <div className="w-10 h-10 rounded-lg bg-[#edf3fb] flex items-center justify-center">
          <BarChart3 size={20} className="text-[#4f7fc4]" />
        </div>
      </div>

      <div className="h-[280px] flex items-end justify-center gap-16 sm:gap-28 border-b border-[#dfe5ed] px-6">
        {/* Income */}
        <div className="h-full flex flex-col justify-end items-center">
          <span className="text-sm font-semibold text-[#16b979] mb-2">
            ₹{graph.income.toLocaleString("en-IN")}
          </span>

          <div
            className="w-20 sm:w-28 bg-[#16b979] rounded-t-xl transition-all"
            style={{ height: incomeHeight }}
          />

          <span className="text-sm text-[#63708a] mt-3 mb-2">Income</span>
        </div>

        {/* Expense */}
        <div className="h-full flex flex-col justify-end items-center">
          <span className="text-sm font-semibold text-[#ef4444] mb-2">
            ₹{graph.expense.toLocaleString("en-IN")}
          </span>

          <div
            className="w-20 sm:w-28 bg-[#ef4444] rounded-t-xl transition-all"
            style={{ height: expenseHeight }}
          />

          <span className="text-sm text-[#63708a] mt-3 mb-2">Expense</span>
        </div>
      </div>
    </div>
  );
};

export default CashFlowCard;
