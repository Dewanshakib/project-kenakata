import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardBackBtn() {
  return (
    <div className="mb-2 inline-flex justify-start w-full">
      <Link
        href={"/account/dashboard"}
        className="bg-gray-50 inline-block p-2 hover:bg-gray-200 transition-all  duration-300 rounded border border-gray-200"
      >
        <ChevronLeft size={22} />
      </Link>
    </div>
  );
}
