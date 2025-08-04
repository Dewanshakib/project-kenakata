"use client";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { useOrderStore } from "@/zustand/order.store";
import React from "react";
import OrderCard from "./order-card";
import Loading from "@/components/common/loader/loading";

export default function AllOrders() {
  const orders = useOrderStore((state) => state.order);
  const { loading } = useFetchOrders();

  if (loading)
    return (
      <div className="w-full grid place-items-center mt-30">
        <Loading />
      </div>
    );

  // console.log(typeof(orders))

  return (
    <div>
      <div className="">
        {orders && orders.length > 0 ? <OrderCard /> : "No orders yet"}
      </div>
    </div>
  );
}
