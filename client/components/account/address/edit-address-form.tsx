"use client";
import {
  EditAccountAddressInput,
  EditAccountAddressSchema,
} from "@/lib/schema";
import { IAddress} from "@/zustand/address.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditAddressForm({ address }: { address: IAddress }) {
  const router = useRouter();

  const onSubmit = async (data: EditAccountAddressInput) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! +
          "/api/users/address/edit-address",
        {
          method: "PUT",
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
      router.push("/account/dasboard");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditAccountAddressInput>({
    resolver: zodResolver(EditAccountAddressSchema),
    defaultValues: {
      name: address.username,
      city: address.city,
      country: address.country,
      state: address.state,
      address: address.address,
    },
  });

  return (
    <div className="mt-12">
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
          {isSubmitting ? "Saving..." : "Save address"}
        </button>
      </form>
    </div>
  );
}
