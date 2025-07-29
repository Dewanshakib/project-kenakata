"use client";
import { useUserStore } from "@/zustand/user.store";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getUserSession() {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/session",
        {
          method: "GET",
          credentials:'include'
        }
      );
      const data = await res?.json();
      if (!res.ok) throw new Error("Unauthorized");

      useUserStore.getState().setUser(data.user);
      return true;
    } catch (error) {
      useUserStore.getState().setLogout();
      return false;
    }
  }

  useEffect(() => {
    getUserSession();
  }, []);

  return <>{children}</>;
}
