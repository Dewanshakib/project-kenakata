"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function AddAddressForm() {

  const router = useRouter()

  const onSubmit = async () => {}

  // const {} = useForm({resolver:zodResolver()})

  return (
    <div className='max-w-xl mx-auto w-full border'>
        <div className="">
            <h1>Add address information</h1>
        </div>

        <div className="">
          <form action="">
            <div className="">

            </div>
          </form>
        </div>
    </div>
  )
}
