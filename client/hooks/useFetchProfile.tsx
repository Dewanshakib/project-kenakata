"use client";

import { useUserStore } from "@/zustand/user.store";
import { useEffect } from "react";

export const useFetchUser = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/users/session`,
          { method: "GET", credentials: "include" }
        );
        const data = await res?.json();
        useUserStore.getState().setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);
};
