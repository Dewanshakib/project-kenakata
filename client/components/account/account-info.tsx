"use client";

import { useFetchUser } from "@/hooks/useFetchProfile";
import { IProfile } from "@/types/types";
import { useUserStore } from "@/zustand/user.store";
import React from "react";
import LogoutBtn from "../auth/logout-btn";
import Image from "next/image";

export default function AccountInfo() {
  const user: IProfile | null = useUserStore((state) => state.user);

  useFetchUser();

  return (
    <div className="w-full mt-5 p-2">
      {/* header starts */}
      <div className="flex items-center flex-row md:gap-x-8 gap-x-4 mb-5 w-full">
        {user && user.avater ? (
          <div className="w-40 h-40 relative border border-gray-300 rounded-full overflow-hidden">
            <Image
              src={user.avater}
              alt="profile photo"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-gray-200 w-40 h-40 rounded-full grid place-items-center">
            <p className="text-5xl font-bold">{user?.name.charAt(0)}</p>
          </div>
        )}

        <div className="flex flex-col">
          <div>
            <span className="text-xl font-medium italic">Hello,</span>
            <br />
            <h1 className="text-2xl font-bold mb-3">{user?.name}</h1>
          </div>

          {/* <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:opacity-85 hover:duration-300 cursor-pointer">
            Logout
          </button> */}
          <LogoutBtn />
        </div>
      </div>

      {/* header ends */}

      <hr className="text-gray-300" />
    </div>
  );
}
