import { useOrderStore } from "@/zustand/order.store";
import { useEffect, useState } from "react";

export const useFetchOrders = () => {
  const [loading, setLoading] = useState(true);
  const setOrder = useOrderStore((state) => state.setOrder);

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/orders/all",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res?.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setOrder(data.orders)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, [setOrder]);

  return { loading };
};
