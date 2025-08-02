import EditAccountForm from '@/components/account/account-edit'
import DashboardBackBtn from '@/components/common/buttons/dashboard-btn'
import React from 'react'

export default function EditAccount() {
  return (
    <div className='grid place-items-center'>
      <DashboardBackBtn/>
      <EditAccountForm/>
    </div>
  )
}
