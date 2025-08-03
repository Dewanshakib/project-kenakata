"use client";
import { useFetchUser } from "@/hooks/useFetchProfile";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [loading,setLoading] = useState(false)
  
  // fetch profile
  const {loading} = useFetchUser()

  if(loading) return <div>Loading...</div>
 
  return <>{children}</>;
}
