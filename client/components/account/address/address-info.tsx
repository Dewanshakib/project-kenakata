"use client";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import { useAddressStore } from "@/zustand/address.store";
import { MapPinned } from "lucide-react";
import Link from "next/link";
import React from "react";
import Loading from "@/components/common/loader/loading";
import EditAddressForm from "./edit-address-form";

export default function AddressInfo() {
  const address = useAddressStore((state) => state.address);

  const { loading } = useFetchAddress();

  if (loading)
    return (
      <div className="w-full grid place-items-center mt-30">
        <Loading />
      </div>
    );

  return (
    <div className=" max-w-2xl mx-auto w-full border p-4 border-slate-300 rounded">
      <div className="">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MapPinned size={32} />
          {address ? "Edit address information" : "Address information"}
        </h1>
      </div>

      {address ? (
        <EditAddressForm address={address} />
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
