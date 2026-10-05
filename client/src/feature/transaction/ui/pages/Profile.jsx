import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { User, Wallet, Save, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../../../../app/context/MyContext";
import useApi from "../../../auth/api/authApi";

const Profile = () => {
  const { user, setUser } = useContext(MyStore);
  const api = useApi();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      currency: user?.currency || "₹",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.patch("/auth/profile", data);

      setUser(response.data.data);

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-[#4f7fc4] mb-1">Account</p>

        <h1 className="text-3xl font-bold text-[#111827]">
          Profile & Settings
        </h1>

        <p className="text-sm text-[#8792a8] mt-2">
          Manage your personal information and finance preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-[#e5eaf0] rounded-2xl shadow-sm overflow-hidden">
        {/* Profile top */}
        <div className="px-7 py-6 border-b border-[#e5eaf0] flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#e8f0fb] text-[#4f7fc4] flex items-center justify-center text-xl font-bold">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#111827]">
              {user?.name || "User"}
            </h2>

            <p className="text-sm text-[#8792a8]">{user?.email}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-7">
          {/* Personal Information */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <CircleUserRound size={19} className="text-[#4f7fc4]" />

              <h3 className="font-semibold text-[#111827]">
                Personal Information
              </h3>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />

                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4] focus:ring-2 focus:ring-[#4f7fc4]/10 transition"
                />
              </div>

              {errors.name && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Finance Preferences */}
          <div className="pt-6 border-t border-[#e5eaf0]">
            <div className="flex items-center gap-2 mb-5">
              <Wallet size={19} className="text-[#4f7fc4]" />

              <div>
                <h3 className="font-semibold text-[#111827]">
                  Finance Preferences
                </h3>

                <p className="text-xs text-[#8792a8] mt-1">
                  Choose how your amounts should be displayed.
                </p>
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-2">
                Default Currency
              </label>

              <select
                {...register("currency", {
                  required: "Currency is required",
                })}
                className="w-full h-12 px-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4] focus:ring-2 focus:ring-[#4f7fc4]/10 transition"
              >
                <option value="₹">₹ — Indian Rupee</option>
                <option value="$">$ — US Dollar</option>
                <option value="€">€ — Euro</option>
                <option value="£">£ — British Pound</option>
                <option value="¥">¥ — Japanese Yen</option>
              </select>

              {errors.currency && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.currency.message}
                </p>
              )}
            </div>
          </div>

          {/* Save */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111827] text-white font-medium hover:bg-[#1f2937] disabled:opacity-50 transition"
            >
              <Save size={17} />

              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
