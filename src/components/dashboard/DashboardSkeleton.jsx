import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white pt-20 pb-8 px-4 lg:px-8">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
              <div className="h-2 w-3/4 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel */}
        <div className="lg:col-span-8 space-y-8">
          {/* Level and Streak Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20"
              >
                <div className="space-y-4">
                  <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
                  <div className="h-2 w-full bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Tasks Section */}
          <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-700/20 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-4 space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20"
            >
              <div className="space-y-4">
                <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2].map((j) => (
                    <div
                      key={j}
                      className="h-4 w-full bg-gray-700/20 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
