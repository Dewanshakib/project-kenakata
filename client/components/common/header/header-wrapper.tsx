"use client";
import React from "react";
import Header from "./header";
import { useUserStore } from "@/zustand/user.store";

export default function HeaderWrapper() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return <>{isAuthenticated && <Header />}</>;
}
