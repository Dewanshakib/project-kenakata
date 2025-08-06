"use client";
import React from "react";
import OrderCard from "./order-card";
import Loading from "@/components/common/loader/loading";
import { useFetchOrders } from "@/hooks/useFetchOrders";

export default function AllOrders() {
  
  const {isLoading,data,error} = useFetchOrders()

  if (isLoading)
    return (
      <div className="w-full grid place-items-center mt-30">
        <Loading />
      </div>
    );

  console.log((data))

  return (
    <div>
      <div className="">
        {data && data.length > 0 ? <OrderCard /> : "No orders yet"}
      </div>
    </div>
  );
}
