"use client";
import { useFetchUser } from "@/hooks/useFetchProfile";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // fetch profile
  useFetchUser()
 
  return <>{children}</>;
}
