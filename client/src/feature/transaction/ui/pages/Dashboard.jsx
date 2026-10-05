import React, { useContext, useEffect, useState } from "react";
import CashFlowCard from "../components/CashFlowCard";
import TransactionsCard from "../components/TransactionsCard";
import SummaryCards from "../components/SummaryCards";
import { MyStore } from "../../../../app/context/MyContext";
import TransactionForm from "../components/TransactionForm";
import DashboardSkeleton from "../components/DashboardSkeleton";
import useApi from "../../../auth/api/authApi";
import CashFlowChart from "./analytics/CashFlowChart";
import CategoryChart from "./analytics/CategoryChart";

const Dashboard = () => {
  const api = useApi();
  const { user, transactions, setTransactions } = useContext(MyStore);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const getDashboard = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      setError("");

      const [dashboardResponse, transactionsResponse] = await Promise.all([
        api.get("/transactions/dashboard"),
        api.get("/transactions/getAll?limit=5"),
      ]);

      setDashboard(dashboardResponse.data.data);
      setTransactions(transactionsResponse.data.data || []);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to load dashboard.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-xl p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        {/* Left */}
        <div>
          <p className="text-sm font-medium text-[#4f7fc4] mb-1">
            Financial Overview
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "there"}
          </h1>

          <p className="text-sm text-[#8792a8] mt-2">
            Here's a quick look at your money today.
          </p>
        </div>

        <TransactionForm onTransactionCreated={() => getDashboard(false)} />
      </div>

      {/* Summary */}
      <SummaryCards dashboard={dashboard} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CashFlowChart
          monthlyData={dashboard?.monthlyData || []}
          currency={user?.currency || "₹"}
        />

        <CategoryChart
          categoryData={dashboard?.categoryData || []}
          currency={user?.currency || "₹"}
        />
      </div>

      {/* Transactions */}
      <TransactionsCard
        transactions={transactions}
        getDashboard={() => getDashboard(false)}
      />
    </section>
  );
};

export default Dashboard;
