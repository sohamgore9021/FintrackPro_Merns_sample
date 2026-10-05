import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CashFlowChart = ({ monthlyData = [], currency = "₹" }) => {
  const data = {
    labels: monthlyData.map((item) => item.month),

    datasets: [
      {
        label: "Income",
        data: monthlyData.map((item) => item.income),
        backgroundColor: "#10b981",
        borderRadius: 8,
      },
      {
        label: "Expense",
        data: monthlyData.map((item) => item.expense),
        backgroundColor: "#ef4444",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${currency}${context.raw.toLocaleString(
              "en-IN",
            )}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${currency}${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white border border-[#dfe5ed] rounded-2xl p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#111827]">
          Cash Flow Overview
        </h2>

        <p className="text-sm text-[#8792a8] mt-1">
          Income vs expenses over time
        </p>
      </div>

      <div className="h-[320px]">
        {monthlyData.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-[#8792a8]">
            No cash flow data available
          </div>
        )}
      </div>
    </div>
  );
};

export default CashFlowChart;
