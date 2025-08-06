"use client";

import { useFetchSession } from "@/hooks/useFetchSession";
import React from "react";
import LogoutBtn from "../../auth/logout-btn";
import Image from "next/image";
import ProfileLoading from "../../common/loader/profile-loading";

export default function AccountInfo() {
  const { isLoading, error, data } = useFetchSession();

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  // console.log(data)

  return (
    <div className="w-full mt-5 p-2">
      {/* header starts */}
      <div className="flex items-center flex-row md:gap-x-8 gap-x-4 mb-5 w-full">
        {data && data?.avater ? (
          <div className="w-40 h-40 relative border border-gray-300 rounded-full overflow-hidden">
            <Image
              src={data?.avater}
              alt="profile photo"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-gray-200 w-40 h-40 rounded-full grid place-items-center">
            <p className="text-5xl font-bold">{data?.name?.charAt(0)}</p>
          </div>
        )}

        <div className="flex flex-col">
          <div>
            <span className="text-xl font-medium italic">Hello,</span>
            <br />
            <h1 className="text-2xl font-bold mb-3">{data?.name}</h1>
          </div>
          <LogoutBtn />
        </div>
      </div>

      {/* header ends */}
      <hr className="text-gray-300" />
    </div>
  );
}
