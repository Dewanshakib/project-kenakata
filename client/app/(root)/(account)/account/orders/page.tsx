import AllOrders from '@/components/account/orders/all-orders'
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
