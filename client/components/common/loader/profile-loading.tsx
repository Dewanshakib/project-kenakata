import React from "react";

export default function ProfileLoading() {
  return (
    <div>
      <div className="flex flex-row gap-3.5">
        <div className="animate-pulse bg-gray-300 w-32 h-32 rounded-full"></div>
        <div className="flex flex-col gap-2 mt-3">
          <div className="animate-pulse bg-gray-300 w-24 h-6 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-36 h-8 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-36 h-8 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
