"use client";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { IProfile } from "@/types/types";
import { useUserStore } from "@/zustand/user.store";
import { Home, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfileInfo() {
  const user: IProfile | null = useUserStore((state) => state.user);
  // console.log(user);

  // fetch profile
  useFetchProfile();

  return (
    <div className="max-w-5xl mx-auto w-full mt-10 p-2">
      {/* header starts */}
      <div className="flex items-center flex-row md:gap-x-8 gap-x-4 mb-5 w-full">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 grid place-items-center">
          <span className="text-3xl md:text-5xl font-bold text-gray-800">
            {user?.name.charAt(0)}
          </span>
        </div>

        <div>
          <span className="text-xl font-medium italic">Hello,</span>
          <br />
          <h1 className="text-2xl font-bold mb-3">{user?.name}</h1>
          <Link
            className="bg-orange-400 text-white px-4 font-medium py-1.5 rounded-2xl"
            href={"/profile/edit"}
          >
            Edit Profile
          </Link>
        </div>

        <div className="hidden md:block ml-auto">
          <button className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:opacity-85 hover:duration-300 cursor-pointer">Logout</button>
        </div>
      </div>

      {/* header ends */}

      <hr className="text-gray-300" />

      {/* content starts */}
      <div className="flex w-full md:flex-row flex-col mt-5 md:gap-x-5 gap-y-5">
        {/* user info starts */}
        <div className="bg-gray-200 p-5 rounded-2xl">
          <h1 className="font-bold text-lg flex gap-x-2">
            <UserCircleIcon size={26} /> User Information
          </h1>
          <div className="mt-5 flex flex-col gap-y-1 font-medium">
            <h1>Name: {user?.name}</h1>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
        {/* user info ends */}
        {/* user address info */}
        <div className="bg-gray-200 p-5 rounded-2xl">
          <h1 className="font-bold text-lg flex gap-x-2">
            <Home /> Address Information
          </h1>
          {user?.address ? (
            <div className=""></div>
          ) : (
            <div>
              <p className="font-semibold text-orange-500 text-center mt-8">
                No address added yet
              </p>
            </div>
          )}
        </div>
        {/* user address info */}
      </div>
      {/* content ends */}
    </div>
  );
}
