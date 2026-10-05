import React from "react";

import { User, Mail, LockKeyhole, Eye, EyeOff, UserPlus } from "lucide-react";

import { useAuth } from "../../hooks/useAuthHook";

const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    navigate,
    onRegisterSubmit,
  } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[500px] bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            FintrackPro
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`w-full h-12 rounded-xl bg-white border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 transition`}
              />
            </div>

            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full h-12 rounded-xl bg-white border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 transition`}
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full h-12 rounded-xl bg-white border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } pl-12 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 transition`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2 font-semibold transition active:scale-[0.99]"
          >
            <UserPlus size={18} />
            Create Account
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            type="button"
            className="text-gray-900 hover:underline font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
