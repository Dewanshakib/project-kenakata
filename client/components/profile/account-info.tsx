"use client";

import { useFetchUser } from "@/hooks/useFetchProfile";
import { IProfile } from "@/types/types";
import { useUserStore } from "@/zustand/user.store";
import React from "react";

export default function AccountInfo() {
  const user: IProfile | null = useUserStore((state) => state.user);

  useFetchUser();

  return (
    <div className="w-full mt-10 p-2">
      {/* header starts */}
      <div className="flex items-center flex-row md:gap-x-8 gap-x-4 mb-5 w-full">
        <div className="w-30 h-30 md:w-32 md:h-32 rounded-full bg-gray-200 grid place-items-center">
          <span className="text-3xl md:text-5xl font-bold text-gray-800">
            {user?.name.charAt(0)}
          </span>
        </div>

        <div className="flex flex-col">
          <div>
            <span className="text-xl font-medium italic">Hello,</span>
            <br />
            <h1 className="text-2xl font-bold mb-3">{user?.name}</h1>
          </div>

          <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:opacity-85 hover:duration-300 cursor-pointer">
            Logout
          </button>
          
        </div>
      </div>

      {/* header ends */}

      <hr className="text-gray-300" />
    </div>
  );
}
