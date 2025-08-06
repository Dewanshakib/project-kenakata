import AllOrders from '@/components/dashboard/orders/all-orders'
import DashboardBackBtn from '@/components/common/buttons/dashboard-btn'
import React from 'react'

export default function Orders() {
  return (
    <div>
      <DashboardBackBtn/>
      <AllOrders/>
    </div>
  )
}
