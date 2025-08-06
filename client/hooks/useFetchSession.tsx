"use client";

import { useUserStore } from "@/zustand/user.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchSession = () => {

  const setUser = useUserStore((state) => state.setUser)
  const fetchSessionFunc = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/session",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
      // 401 or invalid session
      return null; // ✅ Return null instead of nothing
    }

    const data = await res.json();
    return data?.userInfo ?? null; // ✅ Always return something
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["userSession"],
    queryFn: fetchSessionFunc,
    
  });

  console.log(data)

  useEffect(() => {
    if(data){
      setUser(data)
    } else{
      setUser(null)
    }
  },[data,setUser])

  return { isLoading, error, data };
};
