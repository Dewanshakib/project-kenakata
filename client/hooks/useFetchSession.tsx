"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchSession = () => {
  const fetchSessionFunc = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/session",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res?.json();
      return data.userInfo;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["userSession"],
    queryFn: fetchSessionFunc,
  });

  return { isLoading, error, data };
};
