"use client";
import { useAddressStore } from "@/zustand/address.store";
import { useOrderStore } from "@/zustand/order.store";
import { useUserStore } from "@/zustand/user.store";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/logout",
        { credentials: "include" }
      );

      const data = await res?.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      useUserStore.getState().setLogout();
      useAddressStore.getState().clearAddress();
      useOrderStore.getState().clearOrder();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <button
        type="submit"
        className="bg-red-500 cursor-pointer hover:bg-red-600 hover:duration-300 w-full text-white py-2 rounded-md font-semibold"
      >
        <span className="flex items-center justify-center w-full gap-4">
          <LogOut />
          Logout
        </span>
      </button>
    </form>
  );
}
