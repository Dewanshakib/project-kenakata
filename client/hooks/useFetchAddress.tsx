import { useAddressStore } from "@/zustand/address.store";
import { useEffect, useState } from "react";

export const useFetchAddress = () => {
  const [loading, setLoading] = useState(true);
  const setAddress = useAddressStore((state) => state.setAddress);

  useEffect(() => {
    async function getUserAddress() {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/address",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res?.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setAddress(data.address);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUserAddress();
  }, [setAddress]);

  return { loading };
};
