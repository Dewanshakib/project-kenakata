"use client";
import { MapPinned } from "lucide-react";
import Link from "next/link";
import React from "react";
import Loading from "@/components/common/loader/loading";
import EditAddressForm from "./edit-address-form";
import { useFetchAddress } from "@/hooks/useFetchAddress";

export default function AddressInfo() {
  const { isLoading, error, data } = useFetchAddress();

  if (isLoading)
    return (
      <div className="w-full grid place-items-center mt-30">
        <Loading />
      </div>
    );

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className=" max-w-2xl mx-auto w-full border p-4 border-slate-300 rounded">
      <div className="">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MapPinned size={32} />
          {data.address ? "Edit address information" : "Address information"}
        </h1>
      </div>

      {data.address ? (
        <EditAddressForm address={data.address} />
      ) : (
        <div className="mt-10">
          <p className="mb-2 text-xl font-semibold text-slate-700">
            No address added yet
          </p>
          <Link
            href={"address/add-address"}
            className="bg-orange-500 inline-block text-center w-full text-white font-medium p-2 rounded-sm hover:bg-orange-400 duration-300"
          >
            Add your address
          </Link>
        </div>
      )}
    </div>
  );
}
