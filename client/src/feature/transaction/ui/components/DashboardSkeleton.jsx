import React from "react";

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-[#e8edf3] ${className}`} />
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-9 w-64" />
          <SkeletonBox className="h-4 w-80" />
        </div>

        <SkeletonBox className="h-11 w-40" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white border border-[#e5eaf0] rounded-2xl p-5 space-y-4"
          >
            <div className="flex justify-between">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-9 w-9 rounded-lg" />
            </div>

            <SkeletonBox className="h-8 w-32" />
            <SkeletonBox className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white border border-[#e5eaf0] rounded-2xl p-6">
          <div className="space-y-3 mb-6">
            <SkeletonBox className="h-5 w-40" />
            <SkeletonBox className="h-3 w-56" />
          </div>

          <SkeletonBox className="h-[280px] w-full rounded-xl" />
        </div>

        {/* Spending */}
        <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6">
          <div className="space-y-3 mb-7">
            <SkeletonBox className="h-5 w-36" />
            <SkeletonBox className="h-3 w-48" />
          </div>

          <div className="flex justify-center mb-8">
            <SkeletonBox className="h-40 w-40 rounded-full" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <SkeletonBox className="h-3 w-24" />
                <SkeletonBox className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6">
        <div className="flex justify-between mb-6">
          <SkeletonBox className="h-5 w-40" />
          <SkeletonBox className="h-4 w-20" />
        </div>

        <div className="space-y-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SkeletonBox className="h-10 w-10 rounded-xl" />

                <div className="space-y-2">
                  <SkeletonBox className="h-3 w-28" />
                  <SkeletonBox className="h-2 w-20" />
                </div>
              </div>

              <SkeletonBox className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
