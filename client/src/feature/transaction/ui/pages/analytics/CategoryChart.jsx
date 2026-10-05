import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ categoryData = [], currency = "₹" }) => {
  const data = {
    labels: categoryData.map((item) => item.category),

    datasets: [
      {
        data: categoryData.map((item) => item.amount),

        backgroundColor: [
          "#4f7fc4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 18,
          usePointStyle: true,
        },
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            ` ${context.label}: ${currency}${context.raw.toLocaleString(
              "en-IN",
            )}`,
        },
      },
    },
  };

  return (
    <div className="bg-white border border-[#dfe5ed] rounded-2xl p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#111827]">
          Spending by Category
        </h2>

        <p className="text-sm text-[#8792a8] mt-1">Where your money is going</p>
      </div>

      <div className="h-[320px] flex items-center justify-center">
        {categoryData.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className="text-sm text-[#8792a8]">
            No expense data available
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
