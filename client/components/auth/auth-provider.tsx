"use client";
import { useFetchProfile } from "@/hooks/useFetchProfile";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // fetch profile
  useFetchProfile()
 
  return <>{children}</>;
}
