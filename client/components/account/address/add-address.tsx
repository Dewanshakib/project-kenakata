"use client";
import { AddAccountAddressInput, AddAccountAddressSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, MapPinPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddAddressForm() {
  const router = useRouter();

  const onSubmit = async (data: AddAccountAddressInput) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/address/add-address",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res?.json();
      if (!res?.ok) {
        console.log(result.message);
        return;
      }
      toast.success(result.message);
      router.push("/account/address");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddAccountAddressInput>({
    resolver: zodResolver(AddAccountAddressSchema),
  });

  return (
    <div className="max-w-2xl mx-auto w-full border p-4 border-slate-200 rounded-xl">
      <div className="mb-6">
        <Link
          href={"/account/address"}
          className="flex gap-2 items-center p-2 bg-slate-100 hover:bg-slate-300 duration-300 w-fit rounded"
        >
          <ChevronLeftIcon />
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MapPinPlus size={32} /> Add address information
        </h1>
      </div>

      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="Name" className="font-semibold">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Dewan Shakib"
            />
            {errors.name && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Address" className="font-semibold">
              Address
            </label>
            <input
              {...register("address")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Vashantek,Dewan Para,House no:124/3"
            />
            {errors.address && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="City" className="font-semibold">
              City
            </label>
            <input
              {...register("city")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Dhaka"
            />
            {errors.city && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.city.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="font-semibold">
              State
            </label>
            <input
              {...register("state")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Dhaka"
            />
            {errors.state && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.state.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="font-semibold">
              Country
            </label>
            <input
              {...register("country")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Bangladesh"
            />
            {errors.country && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.country.message}
              </span>
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className={`${
              isSubmitting && "opacity-70"
            } bg-orange-500 p-2 w-full text-white font-medium rounded-md hover:bg-orange-700 duration-300`}
          >
            {isSubmitting ? "Adding..." : "Add address"}
          </button>
        </form>
      </div>
    </div>
  );
}
