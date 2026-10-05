import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import useApi from "../../../auth/api/authApi";


const UpdateTransactionForm = ({ transaction, onClose, onUpdated }) => {
  const api = useApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      type: transaction?.type || "expense",
      title: transaction?.title || "",
      amount: transaction?.amount || "",
      date: transaction?.date ? transaction.date.slice(0, 10) : "",
      category: transaction?.category || "",
    },
  });

  // In case transaction changes while component is mounted
  useEffect(() => {
    if (transaction) {
      reset({
        type: transaction.type || "expense",
        title: transaction.title || "",
        amount: transaction.amount || "",
        date: transaction.date ? transaction.date.slice(0, 10) : "",
        category: transaction.category || "",
      });
    }
  }, [transaction, reset]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/transactions/${transaction._id}`, {
        ...data,
        amount: Number(data.amount),
      });

      onUpdated();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#111827]">Edit Transaction</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>

            <select
              {...register("type", { required: true })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#4f7fc4]"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>

            <input
              {...register("title", { required: true })}
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#4f7fc4]"
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>

              <input
                {...register("amount", {
                  required: true,
                  min: 0,
                })}
                type="number"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#4f7fc4]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>

              <input
                {...register("date", { required: true })}
                type="date"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#4f7fc4]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>

            <select
              {...register("category", { required: true })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#4f7fc4]"
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg bg-[#111827] text-white text-sm font-medium hover:bg-[#1f2937] disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransactionForm;
