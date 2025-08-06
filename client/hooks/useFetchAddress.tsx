"use client";
import { useQuery } from "@tanstack/react-query";

export const useFetchAddress = () => {

  const fetchAddressFunc = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/address", {
        method: "GET",
        credentials: "include",
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["userAddress"],
    queryFn: fetchAddressFunc,
  });

  return { isLoading, error, data };
};
