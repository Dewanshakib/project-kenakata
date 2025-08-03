"use client"
import { useFetchOrders } from '@/hooks/useFetchOrders'
import { useOrderStore } from '@/zustand/order.store'
import React from 'react'
import OrderCard from './order-card'

export default function AllOrders() {

  const orders = useOrderStore((state) => state.order)
  const {loading} = useFetchOrders()

  if(loading) return <h1 className='mt-40 text-2xl font-bold text-center'>Loading...</h1>

  // console.log(typeof(orders))

  return (
    <div>
        <div className="">
          {orders && orders.length > 0 ? <OrderCard/> : "No orders yet"}
        </div>
    </div>
  )
}
